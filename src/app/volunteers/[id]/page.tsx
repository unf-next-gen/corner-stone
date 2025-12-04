
import { Container, Stack } from "@mantine/core";
import { getUser } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import { GetVolunteerById } from "../actions";
import VolunteerDetailsClient from "./volunteer-details-client";
import { BackButton } from "@/global/components/back-button";

export default async function Home({ params }: { params: Promise<{ id: string }> }) {



  const { id } = await params;

  const volunteer = await GetVolunteerById(id);

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        {volunteer && (
          <Stack gap="sm">

            <BackButton />
          </Stack>
        )}
        <VolunteerDetailsClient volunteer={volunteer} />
      </Stack>
    </Container>
  );
}