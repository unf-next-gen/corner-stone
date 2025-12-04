// app/volunteers/page.tsx

import { GetVolunteers } from "./actions";
import { getUser } from "../auth/actions";
import { redirect } from 'next/navigation';
import VolunteerManager from "./components/VolunteerManager";
import { Stack, Paper, Title, Divider } from "@mantine/core";

export default async function Volunteers() {



  const volunteers = await GetVolunteers();

  if (!volunteers) {
    return (<div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-red-600">Nothing to show here</h1>

    </div>);
  }


  return (
    <Stack gap="sm" h="100%">
      <Paper withBorder h="100%">
        <Stack>
          <Title order={1}>Volunteer Directory</Title>
          <Divider />
          <VolunteerManager data={volunteers} />
        </Stack>
      </Paper>
    </Stack>
  );
}