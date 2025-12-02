
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
                    
                    <BackButton href="/volunteers"/>
                </Stack>
                )}
                <VolunteerDetailsClient volunteer={volunteer} />
            </Stack>
        </Container>
    );
}