"use client";

import { useMemo, useState } from "react";
import { Table, TextInput, Text, Anchor } from "@mantine/core";
import { Volunteer } from "../../types";
import Link from 'next/link';

export default function VolunteerTable({ data }: { data: Volunteer[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (v) =>
        v.first_name.toLowerCase().includes(q) ||
        v.last_name.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.phone.toLowerCase().includes(q)
    );
  }, [data, query]);

  return (
    <div>
      
      <TextInput
        placeholder="Search by name, email, or phone..."
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        mb="md"
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
              <Table.Th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                First Name
              </Table.Th>
              <Table.Th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Last Name
              </Table.Th>
              <Table.Th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Phone Number
              </Table.Th>
              <Table.Th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Email
              </Table.Th>
              <Table.Th
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Availability
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {filtered.map((v) => (
              <Table.Tr key={v.id}>
                <Table.Td style={{ textAlign: "center" }}>
                 <Link href={`/volunteers/${v.id}`}><Text fz="sm">{v.first_name}</Text></Link>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  <Text fz="sm">{v.last_name}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  <Text fz="sm">{v.phone}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  <Anchor href={`mailto:${v.email}`} target="_blank">
                    {v.email}
                  </Anchor>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  <Text fz="xs" c="dimmed">
                    {Object.entries(v.availability)
                      .filter(([, available]) => available)
                      .map(([day]) => day.slice(0, 3))
                      .join(", ") || "None"}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}