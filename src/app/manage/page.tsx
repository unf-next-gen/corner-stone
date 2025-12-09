"use client";

import React, { useState } from "react";
import { Card, Avatar, Text, Button, Group, Space } from "@mantine/core";
import ChangePassword from "./changepassword/page";
import DeleteAccount from "./deleteaccount/page";

export default function Home() {
  const [currentView, setCurrentView] = useState("account");
  
  const handleChangePasswordClick = () => {
    setCurrentView("changePassword");
  };

  const handleDeleteAccountClick = () => {
    setCurrentView("deleteAccount");
  };

  const handleGoBack = () => {
    setCurrentView("account");
  };

const user = {
    profilePicture: "",
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
      {currentView === "account" && (
        <>
          <Text ta="center" fw={700} size="xl" mb={10}>
            Account Settings
          </Text>
          <Text ta="center" color="dimmed" size="sm" mb={30}>
            Manage your profile and account preferences
          </Text>

          <Card shadow="sm" padding="lg">
            <Group p="left" gap="lg">
              <Avatar src={user.profilePicture} size={100} radius="50%" />
              <div>
                <Text size="lg" fw={500}>
                  {user.name}
                </Text>
                <Text color="dimmed">{user.email}</Text>
              </div>
            </Group>

            <Space h="md" />
            <Button
              fullWidth
              variant="outline"
              color="blue"
              mb={10}
              onClick={handleChangePasswordClick}
            >
              Change Password
            </Button>

            <Button
              fullWidth
              variant="outline"
              color="red"
              onClick={handleDeleteAccountClick}
            >
              Delete Account
            </Button>
          </Card>
        </>
      )}

      {currentView === "changePassword" && <ChangePassword onGoBack={handleGoBack} />}
      {currentView === "deleteAccount" && <DeleteAccount onGoBack={handleGoBack} />}
    </div>
  );
}
