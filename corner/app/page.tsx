"use client";

import { Button, Container, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import LoginUser from "./src/goo-goo-gaga/test";

export default function Home() {
  const [res, setResponse] = useState("");
  const onSubmit = async (formData: FormData) => {
    const response = await LoginUser(formData)
    setResponse(response?.id || "change me")
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1} mb="sm">Corner Stone Volunteer Portal</Title>
          <Text c="dimmed">Welcome to the volunteer management system</Text>
        </div>
        
        <div>
          <Title order={2} mb="md">Quick Actions</Title>
          <Stack gap="md">
            <Button
              component={Link}
              href="/upload-documents"
              variant="filled"
              size="lg"
              fullWidth
            >
              Upload Documents
            </Button>
            
            <form action={onSubmit}>
              <Stack gap="md">
                <Title order={3}>Test Login</Title>
                <TextInput className="max-w-lg" name="username" placeholder="User Name"></TextInput>
                <TextInput className="max-w-lg" name="password" placeholder="Password" type="password"></TextInput>
                <Button variant="outline" type="submit">Test Submit</Button>
                <div className="w-md h-10 bg-slate-200 p-2 rounded">{res}</div>
              </Stack>
            </form>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
}
