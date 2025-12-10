"use client";

import { Card, Text, Group, Button, Badge, Stack } from "@mantine/core";
import {
  IconCalendar,
  IconMapPin,
  IconUsers,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import type { EventCardProps } from "../types";

export function EventCard({
  event,
  onEdit,
  onCancel,
  showActions = true,
}: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "draft":
        return "gray";
      case "cancelled":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <Card withBorder radius="md" p="lg">
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start">
          <div style={{ flex: 1 }}>
            <Group gap="xs" mb="xs">
              <Text fw={600} size="lg">
                {event.title}
              </Text>
              <Badge color={getStatusColor(event.status)} variant="light">
                {event.status}
              </Badge>
            </Group>
            {event.description && (
              <Text size="sm" c="dimmed" lineClamp={2} mb="xs">
                {event.description}
              </Text>
            )}
          </div>
        </Group>

        <Group gap="md">
          <Group gap={4}>
            <IconCalendar size={16} />
            <Text size="sm">{formatDate(event.event_date)}</Text>
          </Group>
          <Group gap={4}>
            <Text size="sm">
              {formatTime(event.start_time)} - {formatTime(event.end_time)}
            </Text>
          </Group>
        </Group>

        <Group gap="md">
          <Group gap={4}>
            <IconMapPin size={16} />
            <Text size="sm" c="dimmed">
              {event.location}
            </Text>
          </Group>
          <Group gap={4}>
            <IconUsers size={16} />
            <Text size="sm" c="dimmed">
              Capacity: {event.capacity}
            </Text>
          </Group>
        </Group>

        {event.tags && event.tags.length > 0 && (
          <Group gap="xs">
            {event.tags.map((tag) => (
              <Badge
                key={tag.id}
                size="sm"
                color={tag.color || "blue"}
                variant="light"
              >
                {tag.name}
              </Badge>
            ))}
          </Group>
        )}

        {showActions && (
          <Group gap="sm" mt="md">
            <Link
              href={`/events/${event.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="light" size="sm">
                View Details
              </Button>
            </Link>
            {onEdit && (
              <Button
                variant="subtle"
                size="sm"
                leftSection={<IconEdit size={16} />}
                onClick={onEdit}
              >
                Edit
              </Button>
            )}
            {onCancel && event.status === "active" && (
              <Button
                variant="subtle"
                size="sm"
                color="red"
                leftSection={<IconTrash size={16} />}
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
          </Group>
        )}
      </Stack>
    </Card>
  );
}
