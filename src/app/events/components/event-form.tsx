'use client';

import {
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Stack,
  Group,
  Switch,
  MultiSelect,
} from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { createEvent, updateEvent, getAllTags } from '../actions';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import type { EventFormProps } from '../types';

export function EventForm({
  event,
  mode = 'create',
}: EventFormProps) {
  const router = useRouter();
  const [availableTags, setAvailableTags] = useState<Array<{ value: string; label: string }>>([]);

  useEffect(() => {
    getAllTags()
      .then(tags => {
        setAvailableTags(tags.map(tag => ({ value: tag.id, label: tag.name })));
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      // Handle date picker input
      const dateInput = document.querySelector('input[name="event_date"]') as HTMLInputElement;
      if (dateInput?.value) {
        formData.set('event_date', dateInput.value);
      }

      // Handle enrollment type switch
      const enrollmentSwitch = document.querySelector('input[name="enrollment_type"]') as HTMLInputElement;
      if (enrollmentSwitch) {
        formData.set('enrollment_type', enrollmentSwitch.checked ? 'manual' : 'auto');
      }

      if (event) {
        await updateEvent(event.id, formData);
        showNotification({
          title: 'Success',
          message: 'Event updated successfully',
          color: 'green',
        });
        router.push(`/events/${event.id}`);
      } else {
        const eventId = await createEvent(formData);
        showNotification({
          title: 'Success',
          message: 'Event created successfully',
          color: 'green',
        });
        router.push(`/events/${eventId}`);
      }
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to save event',
        color: 'red',
      });
    }
  };

  return (
    <form action={handleSubmit}>
      <Stack gap="md">
        <TextInput
          name="title"
          label="Event Title"
          placeholder="Enter event title"
          required
          maxLength={200}
          defaultValue={event?.title}
        />

        <Textarea
          name="description"
          label="Description"
          placeholder="Enter event description"
          rows={4}
          defaultValue={event?.description || ''}
        />

        <DatePickerInput
          name="event_date"
          label="Event Date"
          placeholder="Select date"
          required
          defaultValue={event ? new Date(event.event_date) : undefined}
          minDate={new Date()}
        />

        <Group grow>
          <TimeInput
            name="start_time"
            label="Start Time"
            placeholder="Select time"
            required
            defaultValue={event?.start_time || ''}
          />
          <TimeInput
            name="end_time"
            label="End Time"
            placeholder="Select time"
            required
            defaultValue={event?.end_time || ''}
          />
        </Group>

        <TextInput
          name="location"
          label="Location"
          placeholder="Enter event location/address"
          required
          defaultValue={event?.location}
        />

        <NumberInput
          name="capacity"
          label="Volunteer Capacity"
          placeholder="Enter capacity"
          required
          min={1}
          max={500}
          defaultValue={event?.capacity || 10}
        />

        <Switch
          name="enrollment_type"
          label="Manual Approval Required"
          description="Staff must manually approve each volunteer registration"
          defaultChecked={event?.enrollment_type === 'manual'}
        />

        <MultiSelect
          name="tag_ids"
          label="Event Tags"
          placeholder="Select tags"
          data={availableTags}
          defaultValue={event?.tags?.map(t => t.id) || []}
          searchable
          clearable
        />

        <Group justify="flex-end" mt="md">
          {event && (
            <Button
              variant="subtle"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/events/${event.id}`);
              }}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
