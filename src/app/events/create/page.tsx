import { Container, Title, Paper, Stack } from "@mantine/core";
import { redirect } from "next/navigation";
import { getUser } from "../../auth/actions";
import { EventForm } from "../components/event-form";
import { BackButton } from "../../../global/components/back-button";

export default async function CreateEventPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <BackButton href="/events" />
        <Paper withBorder p="xl" radius="md">
          <Title order={2} mb="xl">
            Create New Event
          </Title>
          <EventForm mode="create" />
        </Paper>
      </Stack>
    </Container>
  );
}
