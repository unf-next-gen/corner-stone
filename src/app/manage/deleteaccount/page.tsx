"use client";

import React, { useState } from "react";
import { Card, Text, Button, Modal, Group } from "@mantine/core";

export default function DeleteAccount({ onGoBack }) {
  const [modalOpened, setModalOpened] = useState(false);

  const handleDeleteClick = () => {
    setModalOpened(true);
  };

  const handleCancel = () => {
    setModalOpened(false);
  };

  const handleConfirmDelete = () => {
    alert('Account deleted successfully!');
    setModalOpened(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
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
        
      <Text ta="center" fw={700} size="xl" mb={10}>Danger Zone</Text>
      <Text ta="center" color="dimmed" size="sm" mb={30}>
        Irreversible account actions
      </Text>

      <Card shadow="sm" padding="lg" style={{ textAlign: 'center' }}>
        <Button
          fullWidth
          variant="filled"
          color="red"
          size="lg"
          onClick={handleDeleteClick}
        >
          Delete Account
        </Button>
      </Card>

      <Modal
        opened={modalOpened}
        onClose={handleCancel}
        title={<Text ta="center" fw={700} size="xl">Are you absolutely sure?</Text>}
        centered
      >
        <Text ta="center" size="sm" color="dimmed" mb={20}>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </Text>

        <Group p="center" gap="lg">
          <Button variant="outline" color="gray" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="filled" color="red" onClick={handleConfirmDelete}>
            Delete Account
          </Button>
        </Group>
      </Modal>

      <Space h="md" />
      <Button fullWidth variant="outline" color="gray" onClick={onGoBack}>
        Go Back
      </Button>
    </div>
  );
}
