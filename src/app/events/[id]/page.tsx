import { Container, Title, Group, Button, Stack } from "@mantine/core";
import { redirect } from "next/navigation";
import { getUser } from "../../auth/actions";
import { getEventById } from "../actions";
import Link from "next/link";
import { BackButton } from "../../../global/components/back-button";
import { EventDetailsClient } from "./event-details-client";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { id } = await params;
  const event = await getEventById(id);

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        {event && (
          <Stack gap="sm">
            <Group justify="space-between" align="center">
              <Title order={1}>{event.title}</Title>
              <Link
                href={`/events/${event.id}/edit`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="light">Edit Event</Button>
              </Link>
            </Group>
            <BackButton href="/events" />
          </Stack>
        )}

        <EventDetailsClient event={event} />
      </Stack>
    </Container>
  );
}
