import { Container, Title, Text, Button, Paper, Group } from "@mantine/core";
import { getUser, signOut } from "./auth/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <Container size="xl" py="xl">
      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Title order={1} mb="md">
          Corner Stone, Welcome
        </Title>

        <Text size="lg" mb="xl" c="dimmed">
          User authentication successful.
        </Text>

        <Paper p="md" bg="grapeSoda.2" radius="md" mb="xl">
          <Text size="sm" fw={500} mb="xs">
            User Information:
          </Text>
          <Text size="sm" c="dimmed">
            Email: {user.email}
          </Text>
          <Text size="sm" c="dimmed">
            User ID: {user.id}
          </Text>
          <Text size="sm" c="dimmed">
            Created: {new Date(user.created_at).toLocaleDateString()}
          </Text>
        </Paper>

        <Group gap="md">
          <form action={signOut}>
            <Button type="submit" variant="outline" color="red">
              Sign Out
            </Button>
          </form>
        </Group>
      </Paper>
    </Container>
  );
}
