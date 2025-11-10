'use client';

import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BackButtonProps {
  text?: string;
  href?: string;
}

export function BackButton({ text = 'Go back', href }: BackButtonProps) {
  const router = useRouter();

  if (href) {
    return (
      <Link href={href}>
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          size="sm"
        >
          {text}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="subtle"
      leftSection={<IconArrowLeft size={16} />}
      size="sm"
      onClick={() => router.back()}
    >
      {text}
    </Button>
  );
}




