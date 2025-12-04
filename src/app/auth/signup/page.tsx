'use client';

import { Button, Container, Paper, TextInput, Title, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import Link from 'next/link';
import { signUp } from '../actions';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    
    try {
      await signUp(formData);
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb="md">
        Create account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5} mb="xl">
        Already have an account?{' '}
        <Anchor size="sm" component={Link} href="/auth/login">
          Sign in
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
          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            type="password"
            mt="md"
            {...form.getInputProps('confirmPassword')}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Create account
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
