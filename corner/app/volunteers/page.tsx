import VolunteerTable, { Volunteer } from "../../components/VolunteerTable";
import { Stack, Title, Text } from "@mantine/core";

const MOCK: Volunteer[] = [
  { id: "v-001", firstName: "Alex", lastName: "Johnson", phone: "555-123-4567", email: "alex.johnson@example.com" },
  { id: "v-002", firstName: "Briana", lastName: "Lee", phone: "555-987-6543", email: "briana.lee@example.com" },
  { id: "v-003", firstName: "Carlos", lastName: "Diaz", phone: "555-456-7890", email: "carlos.diaz@example.com" },
  { id: "v-004", firstName: "Dana", lastName: "Patel", phone: "555-654-3210", email: "dana.patel@example.com" },
];

export default function VolunteersPage() {
  return (
    <Stack p="md" gap="sm">
      <Title order={2}>Cornerstone Volunteers</Title>
      <Text c="dimmed" fz="sm">
        Directory of volunteer contact information.
      </Text>
      <VolunteerTable data={MOCK} />
    </Stack>
  );
}
