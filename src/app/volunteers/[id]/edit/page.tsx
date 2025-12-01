import { Container, Title, Paper } from "@mantine/core";
import { redirect, notFound } from "next/navigation";
import { getUser } from "../../../auth/actions";
import { GetVolunteerById } from "../../actions";
import VolunteerEditForm from "../../components/VolunteerForm";

export default async function EditVolunteerPage({ params }: { params: Promise<{ id: string }> }) {

    const user = await getUser();

    if (!user) {

        redirect("/auth/login");
    }

    const { id } = await params;

    const volunteer = await GetVolunteerById(id);

    return (
        <Container size="xl" py="xl">
            <Paper withBorder p="xl" radius="md">
                <Title order={2} mb="xl">
                    Edit Volunteer
                </Title>
                <VolunteerEditForm volunteer={volunteer}/>
            </Paper>
        </Container>
    );

}