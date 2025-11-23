
import { Container, Title, Group, Button, Stack } from "@mantine/core";
import Link from "next/link";
import { getUser } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import { GetVolunteerById } from "../actions";
import VolunteerDetailsClient from "./volunteer-details-client";
import { BackButton } from "@/global/components/back-button";

export default async function Home({ params }: { params: Promise<{ id: string }> }) {

    const user = await getUser();

    if (!user) {

        redirect("/auth/login");
    }

    const { id } = await params;

    const volunteer = await GetVolunteerById(id);

    return (
        <Container size="xl" py="xl">
            <Stack gap="lg">
                {volunteer  && (
                <Stack gap="sm">
                    <Group justify="space-between" align="center">

                         <Title order={1}>{volunteer.first_name} {volunteer.last_name}</Title>
                         <Link
                         href={`/volunteers/${volunteer.id}/edit`}
                         style={{ textDecoration: "none" }}>

                            <Button variant="light">
                                Edit
                            </Button>
                         </Link>
                    </Group>
                    <BackButton href="/volunteers"/>
                </Stack>
                )}
                <VolunteerDetailsClient volunteer={volunteer} />
            </Stack>
        </Container>
    );
}