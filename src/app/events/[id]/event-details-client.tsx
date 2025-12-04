'use client';

import { Text, Group, Badge, Stack, Paper, Button } from '@mantine/core';
import { IconCalendar, IconMapPin, IconUsers, IconClock } from '@tabler/icons-react';
import { signal } from '@preact/signals-react';
import { ConfirmationModal } from '../../../global/components/confirmation-modal';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useSignals } from '@preact/signals-react/runtime';
import { EventDetailsClientProps } from '../types';
import { cancelEvent } from '../actions';

export function EventDetailsClient({ event }: EventDetailsClientProps) {
  useSignals();
  const router = useRouter();
  const cancelDialogOpened = signal(false);
  const isCancelling = signal(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleCancelEvent = async () => {
    if (!event) return;
    isCancelling.value = true;
    try {
      await cancelEvent(event.id);
      showNotification({
        title: 'Success',
        message: 'Event cancelled successfully',
        color: 'green',
      });
      router.refresh();
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to cancel event',
        color: 'red',
      });
    } finally {
      isCancelling.value = false;
    }
  };

  if (!event) {
    return (
      <Paper withBorder p="xl" radius="md">
        <Text size="lg" ta="center" c="dimmed">
          Event not found
        </Text>
      </Paper>
    );
  }

  return (
    <>
      <Stack gap="lg">
        <Paper withBorder p="lg" radius="md">
          <Stack gap="md">
            {event.description && (
              <div>
                <Text fw={600} mb="xs">Description</Text>
                <Text>{event.description}</Text>
              </div>
            )}

            <Group gap="xl">
              <Group gap={4}>
                <IconCalendar size={20} />
                <Text size="sm"><strong>Date:</strong> {formatDate(event.event_date)}</Text>
              </Group>
              <Group gap={4}>
                <IconClock size={20} />
                <Text size="sm"><strong>Time:</strong> {formatTime(event.start_time)} - {formatTime(event.end_time)}</Text>
              </Group>
              <Group gap={4}>
                <IconMapPin size={20} />
                <Text size="sm"><strong>Location:</strong> {event.location}</Text>
              </Group>
              <Group gap={4}>
                <IconUsers size={20} />
                <Text size="sm"><strong>Capacity:</strong> {event.capacity}</Text>
              </Group>
            </Group>

            {event.tags && event.tags.length > 0 && (
              <div>
                <Text fw={600} mb="xs">Tags</Text>
                <Group gap="xs">
                  {event.tags.map(tag => (
                    <Badge key={tag.id} color={tag.color || 'blue'} variant="light">
                      {tag.name}
                    </Badge>
                  ))}
                </Group>
              </div>
            )}

            <div>
              <Text fw={600} mb="xs">Enrollment Type</Text>
              <Badge variant="light">
                {event.enrollment_type === 'auto' ? 'Auto-accept' : 'Manual Approval'}
              </Badge>
            </div>

            {event.status === 'active' && (
              <Group mt="md">
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => { cancelDialogOpened.value = true; }}
                >
                  Cancel Event
                </Button>
              </Group>
            )}
          </Stack>
        </Paper>
      </Stack>

      <ConfirmationModal
        opened={cancelDialogOpened}
        header="Cancel Event"
        body="Are you sure you want to cancel this event?"
        positiveAction={handleCancelEvent}
        positiveLabel="Confirm Cancellation"
        negativeLabel="Cancel"
        positiveColor="red"
        loading={isCancelling.value}
      />
    </>
  );
}

