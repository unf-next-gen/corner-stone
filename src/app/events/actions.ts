'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase/server';
import { mapEventData, mapEventWithTags } from './helpers/map-event-data';
import { validateEventFields, checkSignificantChange } from './helpers/validate-event';
import type { EventData } from './types';

export async function getEvents(filters?: {
  status?: 'draft' | 'active' | 'cancelled';
  dateFrom?: string;
  dateTo?: string;
  tagIds?: string[];
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  let query = supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.dateFrom) {
    query = query.gte('event_date', filters.dateFrom);
  }

  if (filters?.dateTo) {
    query = query.lte('event_date', filters.dateTo);
  }

  const { data: events, error } = await query;

  if (error) {
    console.error('Failed to fetch events:', error);
    // If table doesn't exist, return empty array instead of throwing
    if (error.code === '42P01' || error.message.includes('does not exist')) {
      console.warn('Events table does not exist. Please run the migration.');
      return [];
    }
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  // If tag filter, fetch events with tags
  if (filters?.tagIds && filters.tagIds.length > 0) {
    const { data: assignments } = await supabase
      .from('event_tag_assignments')
      .select('event_id')
      .in('tag_id', filters.tagIds);

    const eventIds = new Set(assignments?.map(a => a.event_id) || []);
    return (events || []).filter(e => eventIds.has(e.id)).map(mapEventData);
  }

  return (events || []).map(mapEventData);
}

export async function getEventById(id: string): Promise<EventData | null> {
  const supabase = await createClient();

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (eventError || !event) {
    return null;
  }

  // Fetch tags
  const { data: tagAssignments } = await supabase
    .from('event_tag_assignments')
    .select('tag_id')
    .eq('event_id', id);

  if (tagAssignments && tagAssignments.length > 0) {
    const tagIds = tagAssignments.map(ta => ta.tag_id);
    const { data: tags } = await supabase
      .from('event_tags')
      .select('*')
      .in('id', tagIds);

    return mapEventWithTags(event, tags || []);
  }

  return mapEventData(event);
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const validation = validateEventFields(formData);
  if (!validation.isValid) {
    throw new Error(Object.values(validation.errors)[0] || 'Validation failed');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;
  const event_date = formData.get('event_date') as string;
  const start_time = formData.get('start_time') as string;
  const end_time = formData.get('end_time') as string;
  const location = formData.get('location') as string;
  const capacity = parseInt(formData.get('capacity') as string, 10);
  const enrollment_type = (formData.get('enrollment_type') as string) || 'auto';
  const status = (formData.get('status') as string) || 'active';
  const tagIds = formData.getAll('tag_ids') as string[];

  const { data: event, error } = await supabase
    .from('events')
    .insert({
      title,
      description,
      event_date,
      start_time,
      end_time,
      location,
      capacity,
      enrollment_type,
      status,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create event');
  }

  // Assign tags
  if (tagIds.length > 0 && event) {
    const assignments = tagIds.map(tagId => ({
      event_id: event.id,
      tag_id: tagId,
    }));

    await supabase.from('event_tag_assignments').insert(assignments);
  }

  revalidatePath('/events');
  return event.id;
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Fetch original event for change tracking
  const originalEvent = await getEventById(id);
  if (!originalEvent) {
    throw new Error('Event not found');
  }

  const validation = validateEventFields(formData);
  if (!validation.isValid) {
    throw new Error(Object.values(validation.errors)[0] || 'Validation failed');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;
  const event_date = formData.get('event_date') as string;
  const start_time = formData.get('start_time') as string;
  const end_time = formData.get('end_time') as string;
  const location = formData.get('location') as string;
  const capacity = parseInt(formData.get('capacity') as string, 10);
  const enrollment_type = formData.get('enrollment_type') as string;
  const tagIds = formData.getAll('tag_ids') as string[];

  // Update event
  const { error } = await supabase
    .from('events')
    .update({
      title,
      description,
      event_date,
      start_time,
      end_time,
      location,
      capacity,
      enrollment_type,
    })
    .eq('id', id);

  if (error) {
    throw new Error('Failed to update event');
  }

  // Track changes
  const newEvent = {
    title,
    description,
    event_date,
    start_time,
    end_time,
    location,
    capacity,
    enrollment_type: enrollment_type as 'auto' | 'manual',
  };

  const changes = checkSignificantChange(originalEvent, newEvent);
  
  // Log changes
  const fields = ['title', 'description', 'event_date', 'start_time', 'end_time', 'location', 'capacity', 'enrollment_type'];
  for (const field of fields) {
    const oldValue = originalEvent[field as keyof EventData];
    const newValue = newEvent[field as keyof typeof newEvent];
    
    if (oldValue !== newValue) {
      await supabase.from('event_change_history').insert({
        event_id: id,
        changed_by: user.id,
        field_name: field,
        old_value: String(oldValue || ''),
        new_value: String(newValue || ''),
      });
    }
  }

  // Update tag assignments
  await supabase.from('event_tag_assignments').delete().eq('event_id', id);
  if (tagIds.length > 0) {
    const assignments = tagIds.map(tagId => ({
      event_id: id,
      tag_id: tagId,
    }));
    await supabase.from('event_tag_assignments').insert(assignments);
  }

  revalidatePath('/events');
  revalidatePath(`/events/${id}`);
  
  return { eventId: id, significantChange: changes.isSignificant, changes: changes.changes };
}

export async function cancelEvent(id: string, reason?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('events')
    .update({ status: 'cancelled' })
    .eq('id', id);

  if (error) {
    throw new Error('Failed to cancel event');
  }

  // Log cancellation
  await supabase.from('event_change_history').insert({
    event_id: id,
    changed_by: user.id,
    field_name: 'status',
    old_value: 'active',
    new_value: 'cancelled',
    reason: reason || null,
  });

  revalidatePath('/events');
  revalidatePath(`/events/${id}`);
}

export async function reactivateEvent(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('events')
    .update({ status: 'active' })
    .eq('id', id);

  if (error) {
    throw new Error('Failed to reactivate event');
  }

  await supabase.from('event_change_history').insert({
    event_id: id,
    changed_by: user.id,
    field_name: 'status',
    old_value: 'cancelled',
    new_value: 'active',
  });

  revalidatePath('/events');
  revalidatePath(`/events/${id}`);
}

export async function getEventChangeHistory(eventId: string) {
  const supabase = await createClient();

  const { data: history, error } = await supabase
    .from('event_change_history')
    .select('*')
    .eq('event_id', eventId)
    .order('changed_at', { ascending: false });

  if (error) {
    throw new Error('Failed to fetch change history');
  }

  return history || [];
}

export async function checkDuplicateEvent(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get('title') as string;
  const event_date = formData.get('event_date') as string;
  const location = formData.get('location') as string;

  const { data: events, error } = await supabase
    .from('events')
    .select('id, title')
    .eq('title', title)
    .eq('event_date', event_date)
    .eq('location', location)
    .neq('status', 'cancelled');

  if (error) {
    return { isDuplicate: false };
  }

  return { isDuplicate: (events || []).length > 0, duplicates: events || [] };
}

export async function getAllTags() {
  const supabase = await createClient();

  const { data: tags, error } = await supabase
    .from('event_tags')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error('Failed to fetch tags');
  }

  return tags || [];
}

export async function createTag(name: string, color?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: tag, error } = await supabase
    .from('event_tags')
    .insert({
      name,
      color: color || '#868e96',
    })
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create tag');
  }

  revalidatePath('/events');
  return tag;
}

