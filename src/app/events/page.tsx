import { Container, Title, Button, Group, Stack } from '@mantine/core';
import { redirect } from 'next/navigation';
import { getUser } from '../auth/actions';
import { getEvents } from './actions';
import Link from 'next/link';
import { EventsClient } from './events-client';
import type { EventData } from './types';

export default async function EventsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const events = await getEvents();
  const activeEvents = events?.filter((e): e is EventData => e !== null && e.status === 'active') || [];
  const allEvents = events?.filter((e): e is EventData => e !== null) || [];

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={1}>Events</Title>
          <Link href="/events/create" style={{ textDecoration: 'none' }}>
            <Button>Create New Event</Button>
          </Link>
        </Group>

        <EventsClient 
          activeEvents={activeEvents}
          allEvents={allEvents}
        />
      </Stack>
    </Container>
  );
}

