"use client";

import React, { useState } from "react";
import { Card, Text, Button, PasswordInput, Space } from "@mantine/core";

export default function ChangePassword({ onGoBack }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if(newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert("Password changed successfully!");
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
      <Button
        variant="outline"
        color="gray"
        onClick={onGoBack}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: "6px 12px,
        }}
        >
        <--
        </Button>
        
      <Text ta="center" fw={700} size="xl" mb={10}>Change Password</Text>
      <Text ta="center" color="dimmed" size="sm" mb={30}>
        Manage your password settings
      </Text>

      <Card shadow="sm" padding="lg">
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          mb="md"
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          mb="md"
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          mb="md"
        />
        <Space h="md" />
        <Button fullWidth variant="outline" color="blue" onClick={handleSubmit}>
          Change Password
        </Button>

        <Space h="md" />
        <Button fullWidth variant="outline" color="gray" onClick={onGoBack}>
          Go Back
        </Button>
      </Card>
    </div>
  );
}
