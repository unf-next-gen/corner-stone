"use client";

import { useMemo, useState } from "react";
import { Table, TextInput, Text, Anchor, Avatar, Group } from "@mantine/core";
import { Volunteer, Availability } from "../../types";
import Link from 'next/link';

export default function VolunteerTable({ data }: { data: Volunteer[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (v) =>
        v.first_name!.toLowerCase().includes(q) ||
        v.last_name!.toLowerCase().includes(q) ||
        v.email!.toLowerCase().includes(q) ||
        v.phone!.toLowerCase().includes(q)
    );
  }, [data, query]);

  const table_headers = ["Name", "Email", "Phone", "Location", "Availability", "Joined"]
  return (
    <div>

      <TextInput
        placeholder="Search by name, email, or phone..."
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        mb="md"
        w="50%"
      />

      <Table.ScrollContainer minWidth={800}>
        <Table
          striped
          highlightOnHover
          withColumnBorders
          withRowBorders
          verticalSpacing="sm"
          style={{
            textAlign: "center",
            border: "1px solid #ccc",
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {table_headers.map(header => (
                <Table.Th
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {header}
                </Table.Th>
              ))}


            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {filtered.map((v) => (
              <Table.Tr key={v.id}>
                <Table.Td>
                  <Link href={`/volunteers/${v.id}`}>
                    <Group gap="sm" wrap="nowrap">
                      <Avatar />
                      <Text fz="xs" c="dimmed">{v.first_name} {v.last_name}</Text>
                    </Group>
                  </Link>
                </Table.Td>
                <Table.Td style={{ textAlign: "left" }}>
                  <Text fz="xs" c="dimmed">{v.email}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: "left" }}>
                  <Text fz="xs" c="dimmed">
                    {v.phone}
                  </Text>
                </Table.Td>
                <Table.Td style={{ textAlign: "left" }}>
                  <Text fz="xs" c="dimmed">{v.city}, {v.state}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: "left" }}>
                  <Text fz="xs" c="dimmed">
                    {(() => {
                      const av = v.volunteer_availability;
                      if (!av) return "None";

                      const daysOrder: (keyof Availability)[] = [
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                        "sunday",
                      ];

                      const availableDays = daysOrder
                        .filter((day) => av[day] && av[day].length > 0)
                        .map((day) => day.slice(0, 3).toUpperCase());

                      return availableDays.length > 0 ? availableDays.join(", ") : "None";
                    })()}
                  </Text>
                </Table.Td>
                <Table.Td align="left">
                  <Text fz="xs" c="dimmed">{v.created_at}</Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}