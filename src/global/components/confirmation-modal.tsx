"use client";

import { Modal, Button, Group, Stack } from "@mantine/core";
import { Signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { ReactNode } from "react";

interface ConfirmationModalProps {
  opened: Signal<boolean>;
  positiveAction: () => void | Promise<void>;
  negativeAction?: () => void;
  header?: string | ReactNode;
  body: string | ReactNode;
  footer?: ReactNode;
  positiveLabel?: string;
  negativeLabel?: string;
  positiveColor?: string;
  centered?: boolean;
  loading?: boolean;
}

export function ConfirmationModal({
  opened,
  positiveAction,
  negativeAction,
  header,
  body,
  footer,
  positiveLabel = "Confirm",
  negativeLabel = "Cancel",
  positiveColor = "blue",
  centered = true,
  loading = false,
}: ConfirmationModalProps) {
  useSignals();

  const handlePositive = async () => {
    await positiveAction();
    opened.value = false;
  };

  const handleNegative = () => {
    if (negativeAction) {
      negativeAction();
    } else {
      opened.value = false;
    }
  };

  const defaultFooter = (
    <Group justify="flex-end mt-4" gap="sm">
      <Button variant="subtle" onClick={handleNegative} disabled={loading}>
        {negativeLabel}
      </Button>
      <Button color={positiveColor} onClick={handlePositive} loading={loading}>
        {positiveLabel}
      </Button>
    </Group>
  );

  return (
    <Modal
      opened={opened.value}
      onClose={() => {
        if (!loading) {
          opened.value = false;
        }
      }}
      title={header}
      centered={centered}
    >
      <Stack gap="md">
        <div>{body}</div>
        {footer || defaultFooter}
      </Stack>
    </Modal>
  );
}
