import { Availability } from "../../types";
import { Table, Stack, Title } from "@mantine/core";
import { isAvailable } from "../../helpers";

export default function AvailabilityTable({ data }: { data: Availability }) {

    const time_slots = ["morning", "afternoon", "evening"];
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const day_labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    if (!data) {
        return <div>No availability data available</div>;
    }

    return (
        <Stack gap="sm">
            <Title order={2}>Availability</Title>
            <Table>
            <thead>
                <tr>
                    <th>Time</th>
                    {day_labels.map(day => (
                        <th key={day} style={{ textAlign: 'center' }}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {time_slots.map(slot => (
                    <tr key={slot}>
                        <th style={{ textTransform: 'capitalize' }}>{slot}</th>
                        {days.map(day => (
                            <td
                                key={day}
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: isAvailable(day, slot, data) ? '#d4edda' : '#f8d7da',
                                    fontWeight: 'bold'
                                }}
                            >
                                {isAvailable(day, slot, data) ? '✓' : '✗'}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
        </Stack>
        
    );

}