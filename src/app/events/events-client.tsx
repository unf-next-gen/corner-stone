'use client';

import { SimpleGrid, Stack, Text, Tabs } from '@mantine/core';
import { EventCard } from './components/event-card';
import type { EventData, EventsClientProps } from './types';
import { useRouter } from 'next/navigation';

export function EventsClient({ activeEvents, allEvents }: EventsClientProps) {
  const router = useRouter();

  const handleEdit = (event: EventData) => {
    router.push(`/events/${event.id}/edit`);
  };

  const renderEvents = (events: EventData[], viewMode: 'volunteer' | 'admin') => {
    if (events.length === 0) {
      return (
        <Stack align="center" py="xl">
          <Text c="dimmed">
            {viewMode === 'admin' 
              ? 'No events found. Create your first event to get started!'
              : 'No active events available at this time.'}
          </Text>
        </Stack>
      );
    }

    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={viewMode === 'admin' ? () => handleEdit(event) : undefined}
            showActions={viewMode === 'admin'}
          />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Tabs defaultValue="volunteer">
      <Tabs.List>
        <Tabs.Tab value="volunteer">Volunteer View</Tabs.Tab>
        <Tabs.Tab value="admin">Admin View</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="volunteer" pt="lg">
        {renderEvents(activeEvents, 'volunteer')}
      </Tabs.Panel>

      <Tabs.Panel value="admin" pt="lg">
        {renderEvents(allEvents, 'admin')}
      </Tabs.Panel>
    </Tabs>
  );
}

