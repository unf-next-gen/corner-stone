import { Availability } from "../../types";
import { Table, Stack, Title } from "@mantine/core";
import { isAvailable } from "../../helpers";
import { IconX, IconCheck } from "@tabler/icons-react";

export default function AvailabilityTable({ data }: { data: Availability }) {

    const time_slots = ["morning", "afternoon", "evening"];
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const day_labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    if (!data) {
        return <div>No availability data available</div>;
    }

    return (
        <Stack gap="sm" p="md">
            <Title order={2}>Availability</Title>
            <Table withColumnBorders withTableBorder withRowBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Time</Table.Th>
                    {day_labels.map(day => (
                        <Table.Th key={day} style={{ textAlign: 'center' }}>{day}</Table.Th>
                    ))}
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {time_slots.map(slot => (
                    <Table.Tr key={slot}>
                        <Table.Th style={{ textTransform: 'capitalize' }}>{slot}</Table.Th>
                        {days.map(day => (
                            <Table.Td
                                key={day}
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: isAvailable(day, slot, data) ? '#d4edda' : '#f8d7da',
                                    fontWeight: 'bold'
                                }}

                            >
                                {isAvailable(day, slot, data) ? (<IconCheck size={18}/>) : (<IconX size={18}/>)}
                            </Table.Td>
                        ))}
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
        </Stack>
        
    );

}