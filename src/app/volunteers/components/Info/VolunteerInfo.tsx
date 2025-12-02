import { Volunteer } from "../../types";
import { Stack, Text, Group, Avatar, Paper, Divider, Title, Badge, Button, Grid, Card } from "@mantine/core";
import { IconPhone, IconMail, IconEdit } from '@tabler/icons-react';
import { returnTimeActive } from "../../helpers";

export default function VolunteerInfo({ data }: { data: Volunteer }) {


     return (
        <Paper withBorder p="sm">
            <Stack gap="lg">
                <Group justify="space-between" align="flex-start">
                    <Group gap="lg" align="flex-start">
                        <Avatar size={80} radius="md">
                            {data.first_name?.[0]}{data.last_name?.[0]}
                        </Avatar>
                        
                        <Stack gap="xs">
                            <Group gap="sm" align="center">
                                <Title order={1}>{data.first_name} {data.last_name}</Title>
                            </Group>
                            
                            <Group gap="md">
                                {data.email && (
                                    <Group gap="xs">
                                        <IconMail size={16} />
                                        <Text size="sm" c="dimmed">{data.email}</Text>
                                    </Group>
                                )}
                                {data.phone && (
                                    <Group gap="xs">
                                        <IconPhone size={16} />
                                        <Text size="sm" c="dimmed">{data.phone}</Text>
                                    </Group>
                                )}
                            </Group>
                            
                            {data.roles && data.roles.length > 0 && (
                                <Group gap="xs">
                                    {data.roles.map((role, index) => (
                                        <Badge key={index} variant="light">
                                            {role}
                                        </Badge>
                                    ))}
                                </Group>
                            )}
                        </Stack>
                    </Group>
                    
                    <Button leftSection={<IconEdit size={16} />} variant="light">
                        Edit
                    </Button>
                </Group>

                <Divider />

                <Grid gutter="md">
                    <Grid.Col span={4}>
                        <Card withBorder p="md" style={{ textAlign: 'center' }}>
                            <Text size="sm" c="dimmed">Active for</Text>
                            <Text size="sm" c="dimmed">{returnTimeActive(data.created_at)}</Text>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card withBorder p="md" style={{ textAlign: 'center' }}>
                            <Text size="sm" c="dimmed">Volunteered for</Text>
                            <Text size="sm" c="dimmed">(Hours) hours</Text>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card withBorder p="md" style={{ textAlign: 'center' }}>
                            <Text size="sm" c="dimmed">Volunteered for</Text>
                            <Text size="sm" c="dimmed">(Num Events) Events</Text>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Paper>
    );
}