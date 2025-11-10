'use client';

import { EventForm } from '../../components/event-form';
import type { EditEventClientProps } from '../../types';

export function EditEventClient({ event }: EditEventClientProps) {
  return <EventForm event={event} mode="edit" />;
}

