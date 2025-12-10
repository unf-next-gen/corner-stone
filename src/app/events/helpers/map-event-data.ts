import type { EventData, SupabaseEventRow, SupabaseTagRow } from "../types";

export function mapEventData(row: SupabaseEventRow | null): EventData | null {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    event_date: row.event_date,
    start_time: row.start_time,
    end_time: row.end_time,
    location: row.location,
    capacity: row.capacity,
    enrollment_type: row.enrollment_type as "auto" | "manual",
    status: row.status as "draft" | "active" | "cancelled",
    created_by: row.created_by,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function mapEventWithTags(
  eventRow: SupabaseEventRow | null,
  tagRows: SupabaseTagRow[] = []
): EventData | null {
  const event = mapEventData(eventRow);

  if (!event) {
    return null;
  }

  return {
    ...event,
    tags: tagRows.map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })),
  };
}
