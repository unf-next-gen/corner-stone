'use client';

import { Button, Container, Paper, TextInput, Title, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from '../actions';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    
    try {
      await signIn(formData);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb="md">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5} mb="xl">
        Do not have an account yet?{' '}
        <Anchor size="sm" component={Link} href="/auth/signup">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Password"
            placeholder="Your password"
            required
            type="password"
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
