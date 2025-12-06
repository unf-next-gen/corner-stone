"use client"

import { Volunteer } from "../types";
import AvailabilityTable from "../components/Tables/AvailabilityTable";
import VolunteerInfo from "../components/Info/VolunteerInfo";
import VolunteerDocs from "../components/Info/VolunteerDocs";
import { Stack, Paper, Tabs } from "@mantine/core";

export default function VolunteerDetailsClient({ volunteer }: { volunteer: Volunteer }) {


  return (
    <Stack>
      <VolunteerInfo data={volunteer} />
      <Tabs defaultValue="availability">
        <Tabs.List >
          <Tabs.Tab value="availability">
            Availability
          </Tabs.Tab>
          <Tabs.Tab value="documents">
            Documents
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="availability">
          <Paper>
            <AvailabilityTable data={volunteer.volunteer_availability} />
          </Paper>

        </Tabs.Panel>
        <Tabs.Panel value="documents" >
          <VolunteerDocs data={volunteer.volunteer_documents} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}