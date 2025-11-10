"use client";

import { useMemo, useState } from "react";
import { Table, TextInput, Text, Anchor } from "@mantine/core";

export type Volunteer = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export default function VolunteerTable({ data }: { data: Volunteer[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (v) =>
        v.firstName.toLowerCase().includes(q) ||
        v.lastName.toLowerCase().includes(q) ||
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
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {filtered.map((v) => (
              <Table.Tr key={v.id}>
                <Table.Td style={{ textAlign: "center" }}>
                  <Text fz="sm">{v.firstName}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  <Text fz="sm">{v.lastName}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  <Text fz="sm">{v.phone}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  <Anchor href={`mailto:${v.email}`} target="_blank">
                    {v.email}
                  </Anchor>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
