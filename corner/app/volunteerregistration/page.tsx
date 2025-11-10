"use client";

import {
  Box,
  Grid,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  MultiSelect,
  Checkbox,
  Group,
  Button,
  Divider,
  Stack,
  Badge,
  Flex,
  ActionIcon,
  rem,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconHeartHandshake,
  IconPhone,
  IconMail,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

const role: string[] = [];

export default function VolunteerRegisterPage() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      dob: "",
      roles: role,
      availability: {
        mon: {
          morning: false,
          afternoon: false,
          evening: false,
          allday: false,
        },
        tue: {
          morning: false,
          afternoon: false,
          evening: false,
          allday: false,
        },
        wed: {
          morning: false,
          afternoon: false,
          evening: false,
          allday: false,
        },
        thu: {
          morning: false,
          afternoon: false,
          evening: false,
          allday: false,
        },
        fri: {
          morning: false,
          afternoon: false,
          evening: false,
          allday: false,
        },
        sat: {
          morning: false,
          afternoon: false,
          evening: false,
          allday: false,
        },
        sun: {
          morning: false,
          afternoon: false,
          evening: false,
          allday: false,
        },
      },
      emergencyContacts: [
        {
          name: "",
          relationship: "",
          phone: "",
        },
      ],
      agree: false,
    },

    validate: {
      firstName: (value) =>
        value.trim().length === 0 ? "First name is required" : null,
      lastName: (value) =>
        value.trim().length === 0 ? "Last name is required" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please enter a valid email",
      phone: (value) =>
        value.trim().length === 0 ? "Phone number is required" : null,
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
      roles: (value: string[]) =>
        value.length === 0 ? "Select at least one role" : null,
      agree: (value) =>
        value ? null : "You must agree before creating an account",
    },
  });

  // helper to update availability checkboxes
  function setAvailability(dayKey: string, slotKey: string, checked: boolean) {
    form.setFieldValue("availability", {
      ...form.values.availability,
      [dayKey]: {
        ...form.values.availability[
          dayKey as keyof typeof form.values.availability
        ],
        [slotKey]: checked,
      },
    });
  }

  function addEmergencyContact() {
    form.setFieldValue("emergencyContacts", [
      ...form.values.emergencyContacts,
      { name: "", relationship: "", phone: "" },
    ]);
  }

  function removeEmergencyContact(index: number) {
    const updated = form.values.emergencyContacts.filter((_, i) => i !== index);
    form.setFieldValue("emergencyContacts", updated);
  }

  function updateEmergencyField(
    index: number,
    field: "name" | "relationship" | "phone",
    value: string
  ) {
    const updated = [...form.values.emergencyContacts];
    updated[index] = { ...updated[index], [field]: value };
    form.setFieldValue("emergencyContacts", updated);
  }

  function handleSubmit(values: typeof form.values) {
    console.log("Register form submitted:", values);
    // TODO: connect to Supabase signup / DB insert
  }

  const days: { key: keyof typeof form.values.availability; label: string }[] =
    [
      { key: "mon", label: "Monday" },
      { key: "tue", label: "Tuesday" },
      { key: "wed", label: "Wednesday" },
      { key: "thu", label: "Thursday" },
      { key: "fri", label: "Friday" },
      { key: "sat", label: "Saturday" },
      { key: "sun", label: "Sunday" },
    ];

  return (
    <Box
      component="main"
      bg="var(--mantine-color-gray-1)"
      mih="100vh"
      py="xl"
      px="md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        shadow="xl"
        radius="lg"
        withBorder
        p="xl"
        style={{
          maxWidth: 1200,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Grid gutter="xl">
          {/* LEFT: REGISTRATION FORM */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="lg">
              <div>
                <Title order={2} fw={600}>
                  Volunteer Registration
                </Title>
                <Text c="dimmed" size="sm" mt={4}>
                  Create your Cornerstone Connections volunteer account to sign
                  up for events and track your hours.
                </Text>
              </div>

              <Divider label="Account Information" labelPosition="left" />

              <Grid gutter="md">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="First Name"
                    placeholder="John"
                    withAsterisk
                    {...form.getInputProps("firstName")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Last Name"
                    placeholder="Smith"
                    withAsterisk
                    {...form.getInputProps("lastName")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Email"
                    placeholder="you@example.com"
                    withAsterisk
                    {...form.getInputProps("email")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                    withAsterisk
                    {...form.getInputProps("phone")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <PasswordInput
                    label="Password"
                    placeholder=""
                    withAsterisk
                    {...form.getInputProps("password")}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Repeat password"
                    withAsterisk
                    {...form.getInputProps("confirmPassword")}
                  />
                </Grid.Col>
              </Grid>

              <Divider label="Personal Information" labelPosition="left" />

              <Grid gutter="md">
                <Grid.Col span={12}>
                  <TextInput
                    label="Street Address"
                    placeholder=""
                    {...form.getInputProps("address")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="City"
                    placeholder=""
                    {...form.getInputProps("city")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 6, sm: 3 }}>
                  <TextInput
                    label="State"
                    placeholder=""
                    maxLength={2}
                    {...form.getInputProps("state")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 6, sm: 3 }}>
                  <TextInput
                    label="ZIP Code"
                    placeholder=""
                    {...form.getInputProps("zip")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <TextInput
                    label="Date of Birth"
                    placeholder="MM/DD/YYYY"
                    {...form.getInputProps("dob")}
                  />
                </Grid.Col>

                {/* MULTISELECT ROLES */}
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <MultiSelect
                    label="Preferred Volunteer Roles"
                    placeholder="Select all that apply"
                    data={[
                      {
                        value: "events",
                        label: "Event Hosting / Event Planning",
                      },
                      { value: "interviews", label: "Mock Interviews" },
                      { value: "admin", label: "Administrative Support" },
                      { value: "career", label: "Career Exploration" },
                      {
                        value: "training",
                        label: "Virtual / In-Person Training",
                      },
                      { value: "mentoring", label: "Mentoring / Tutoring" },
                      { value: "speakers", label: "Speakers Bureau" },
                      {
                        value: "community outreach",
                        label: "Community Outreach",
                      },
                      { value: "clothing", label: "Community Clothing Closet" },
                      { value: "data", label: "Data Collection" },
                      { value: "donor outreach", label: "Donor Outreach" },
                      {
                        value: "corperate outreach",
                        label: "Corperate Outreach",
                      },
                      { value: "donations", label: "In-Kind Donations" },
                      { value: "other", label: "Others" },
                    ]}
                    withAsterisk
                    {...form.getInputProps("roles")}
                  />
                </Grid.Col>
                {/* CONDITIONAL OTHER FIELD */}
                {form.values.roles.includes("other") && (
                  <Grid.Col span={12}>
                    <TextInput
                      label="Other area(s) of interest"
                      placeholder="ex: Social media, youth tutoring, IT help…"
                      withAsterisk
                      {...form.getInputProps("otherRoleDetail")}
                    />
                  </Grid.Col>
                )}
              </Grid>

              <Divider label="Availability" labelPosition="left" />

              <Stack gap="sm">
                {days.map((d) => (
                  <Card
                    key={d.key}
                    withBorder
                    radius="md"
                    padding="md"
                    style={{ backgroundColor: "var(--mantine-color-gray-0)" }}
                  >
                    <Text fw={500} size="sm" mb={8}>
                      {d.label}
                    </Text>
                    <Group gap="md" wrap="wrap">
                      <Checkbox
                        label="Morning"
                        checked={
                          form.values.availability[d.key].morning || false
                        }
                        onChange={(e) =>
                          setAvailability(d.key, "morning", e.target.checked)
                        }
                      />
                      <Checkbox
                        label="Afternoon"
                        checked={
                          form.values.availability[d.key].afternoon || false
                        }
                        onChange={(e) =>
                          setAvailability(d.key, "afternoon", e.target.checked)
                        }
                      />
                      <Checkbox
                        label="Evening"
                        checked={
                          form.values.availability[d.key].evening || false
                        }
                        onChange={(e) =>
                          setAvailability(d.key, "evening", e.target.checked)
                        }
                      />
                      <Checkbox
                        label="All day"
                        checked={
                          form.values.availability[d.key].allday || false
                        }
                        onChange={(e) =>
                          setAvailability(d.key, "allday", e.target.checked)
                        }
                      />
                    </Group>
                  </Card>
                ))}
              </Stack>

              <Divider label="Emergency Contacts" labelPosition="left" />

              <Stack gap="md">
                {form.values.emergencyContacts.map((contact, index) => (
                  <Paper
                    key={index}
                    withBorder
                    radius="md"
                    p="md"
                    style={{
                      backgroundColor: "var(--mantine-color-gray-0)",
                      position: "relative",
                    }}
                  >
                    <Group justify="space-between" align="flex-start" mb="sm">
                      <Text fw={500} size="sm">
                        Contact {index + 1}
                      </Text>

                      {form.values.emergencyContacts.length > 1 && (
                        <ActionIcon
                          variant="subtle"
                          aria-label="Remove contact"
                          onClick={() => removeEmergencyContact(index)}
                        >
                          <IconTrash
                            style={{
                              width: rem(16),
                              height: rem(16),
                            }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      )}
                    </Group>

                    <Grid gutter="md">
                      <Grid.Col span={{ base: 12, sm: 6 }}>
                        <TextInput
                          label="Name"
                          placeholder="Parent / Guardian / Spouse"
                          value={contact.name}
                          onChange={(e) =>
                            updateEmergencyField(
                              index,
                              "name",
                              e.currentTarget.value
                            )
                          }
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 3 }}>
                        <TextInput
                          label="Relationship"
                          placeholder="Mother"
                          value={contact.relationship}
                          onChange={(e) =>
                            updateEmergencyField(
                              index,
                              "relationship",
                              e.currentTarget.value
                            )
                          }
                        />
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, sm: 3 }}>
                        <TextInput
                          label="Phone Number"
                          placeholder="(555) 987-6543"
                          value={contact.phone}
                          onChange={(e) =>
                            updateEmergencyField(
                              index,
                              "phone",
                              e.currentTarget.value
                            )
                          }
                        />
                      </Grid.Col>
                    </Grid>
                  </Paper>
                ))}

                <Button
                  variant="light"
                  leftSection={
                    <IconPlus
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                  onClick={addEmergencyContact}
                  radius="md"
                >
                  Add another contact
                </Button>
              </Stack>

              <Checkbox
                mt="sm"
                label={
                  <Text size="sm">
                    I certify that the above information is accurate. I
                    understand I am volunteering and not entering an employment
                    contract.
                  </Text>
                }
                {...form.getInputProps("agree", { type: "checkbox" })}
              />

              <Stack gap="xs">
                <Button
                  size="md"
                  radius="md"
                  onClick={() => form.onSubmit(handleSubmit)}
                >
                  Create Account
                </Button>

                <Text size="sm" ta="center" c="dimmed">
                  Already have an account?{" "}
                  <Text
                    component="a"
                    href="/login"
                    fw={500}
                    c="blue"
                    style={{ textDecoration: "none" }}
                  >
                    Log in
                  </Text>
                </Text>
              </Stack>
            </Stack>
          </Grid.Col>

          {/* RIGHT: INFO / WHY VOLUNTEER */}
          <Grid.Col
            span={{ base: 12, md: 5 }}
            style={{
              borderLeft: "1px solid var(--mantine-color-gray-3)",
            }}
          >
            <Stack
              gap="lg"
              px={{ base: 0, md: "md" }}
              pt={{ base: "lg", md: 0 }}
            >
              <Flex align="center" gap="sm">
                <IconHeartHandshake
                  style={{ width: 28, height: 28 }}
                  stroke={1.5}
                />
                <div>
                  <Title order={3} fw={600}>
                    Cornerstone Connections
                  </Title>
                  <Text size="sm" c="dimmed">
                    Volunteer Program
                  </Text>
                </div>
              </Flex>

              <Text size="sm" lh={1.5}>
                We connect passionate volunteers with real community needs.
                Whether you're supporting outreach events, helping families, or
                assisting with operations, your time directly impacts the people
                we serve.
              </Text>

              <Group gap="xs">
                <Badge radius="sm" variant="light">
                  Community Hours
                </Badge>
                <Badge radius="sm" variant="light">
                  Real Impact
                </Badge>
                <Badge radius="sm" variant="light">
                  Flexible Schedule
                </Badge>
              </Group>

              <Paper
                withBorder
                radius="md"
                p="md"
                bg="var(--mantine-color-gray-0)"
              >
                <Title order={4} fw={600}>
                  Need help registering?
                </Title>

                <Stack gap={6} mt="sm">
                  <Flex align="center" gap={8}>
                    <IconPhone style={{ width: 16, height: 16 }} stroke={1.5} />
                    <Text size="sm">(904) 555-1212</Text>
                  </Flex>

                  <Flex align="center" gap={8}>
                    <IconMail style={{ width: 16, height: 16 }} stroke={1.5} />
                    <Text size="sm">volunteers@cornerstone.org</Text>
                  </Flex>
                </Stack>

                <Text size="xs" c="dimmed" mt="sm">
                  Office hours: Mon–Fri, 9am–5pm EST
                </Text>
              </Paper>

              <Paper
                withBorder
                radius="md"
                p="md"
                bg="var(--mantine-color-blue-0)"
              >
                <Title order={4} fw={600}>
                  What happens next?
                </Title>
                <Text size="sm" mt={4}>
                  1. You’ll get a confirmation email.
                  <br />
                  2. A coordinator will review your info.
                  <br />
                  3. You’ll get access to upcoming events and sign-ups.
                </Text>
              </Paper>

              <Text size="xs" c="dimmed" ta="center">
                By registering, you agree to follow Cornerstone Connections
                volunteer guidelines and respect client confidentiality.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Box>
  );
}
