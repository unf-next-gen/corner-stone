
import { Documents } from "../../types";
import Link from "next/link";
import { Stack, Title, Card, Flex, Text, Paper, FileInput } from "@mantine/core";
import { IconFileTypePdf } from "@tabler/icons-react";

export default function VolunteerDocs({ data }: { data: Documents[] }) {

  if (!data) {
    return (<div>No documents to show</div>)
  } else if (data.length === 0) {
    return (
      <Stack >
        <Title order={4}>No documents to show</Title>
      </Stack>
    )
  }
  return (
    <Paper withBorder p="lg">
      <Stack>

        {data.map((d) => (
          <Card key={d.id} withBorder radius="md" shadow="sm">
            <Flex mih={25}>
              <IconFileTypePdf color="red" />

              <Link key={d.id} href={d.url} rel="noopener noreferrer" target="_blank" className="hover:text-[hover:#228BE6]"
              >{d.file_name}</Link>

              <Text px="lg" c="dimmed">
                {d.document_type}
              </Text>
              <Text>
                Uploaded {d.uploaded_at}
              </Text>

            </Flex>
          </Card>
        ))}

        <FileInput
          label="Upload Files"
          description=""
          placeholder="Click to upload"
        />
      </Stack>

    </Paper>
  );
}