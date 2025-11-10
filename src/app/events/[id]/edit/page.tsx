import { Container, Title, Paper } from "@mantine/core";
import { redirect, notFound } from "next/navigation";
import { getUser } from "../../../auth/actions";
import { getEventById } from "../../actions";
import { EventForm } from "../../components/event-form";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <Container size="lg" py="xl">
      <Paper withBorder p="xl" radius="md">
        <Title order={2} mb="xl">
          Edit Event
        </Title>
        <EventForm event={event} mode="edit" />
      </Paper>
    </Container>
  );
}
