"use client"
import { useState } from "react";
import { Volunteer } from "../types";
import AvailabilityTable from "../components/Tables/AvailabilityTable";
import VolunteerInfo from "../components/Info/VolunteerInfo";
import { Stack, Paper, Flex, Box, Button, Group } from "@mantine/core";

export default function VolunteerDetailsClient({ volunteer }: { volunteer: Volunteer }) {
    const [activeTab, setActiveTab] = useState("availability");

    return (
        <Stack>

            
                <VolunteerInfo data={volunteer} />
            

            <Box style={{ flex: 1, minWidth: 0 }}>
                <Paper withBorder>
                    <Group gap={0} style={{ borderBottom: '1px solid #dee2e6' }}>
                        <Button
                            variant={activeTab === "availability" ? "light" : "subtle"}
                            onClick={() => setActiveTab("availability")}
                            style={{ borderRadius: 0, borderBottom: activeTab === "availability" ? '2px solid #228be6' : 'none' }}
                        >
                            Availability
                        </Button>
                        <Button
                            variant={activeTab === "documents" ? "light" : "subtle"}
                            onClick={() => setActiveTab("documents")}
                            style={{ borderRadius: 0, borderBottom: activeTab === "documents" ? '2px solid #228be6' : 'none' }}
                        >
                            Documents
                        </Button>
                        <Button
                            variant={activeTab === "events" ? "light" : "subtle"}
                            onClick={() => setActiveTab("events")}
                            style={{ borderRadius: 0, borderBottom: activeTab === "events" ? '2px solid #228be6' : 'none' }}
                        >
                            Events
                        </Button>
                    </Group>
                    <Box p="md">
                        {activeTab === "overview" && <div>Overview content</div>}
                        {activeTab === "availability" && <AvailabilityTable data={volunteer.volunteer_availability} />}
                    </Box>
                </Paper>
            </Box>
        </Stack>
    );
}