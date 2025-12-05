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
  Radio,
  Textarea,
} from "@mantine/core";

import {
  IconHeartHandshake,
  IconPhone,
  IconMail,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

import { useVolunteerRegister } from "./useVolunteerRegister";

export default function VolunteerRegisterPage() {
  const {
    form,
    days,
    setAvailability,
    addEmergencyContact,
    removeEmergencyContact,
    updateEmergencyField,
    handleSubmit,
  } = useVolunteerRegister();

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
      <form
        onSubmit={form.onSubmit(
          (values) => {
            console.log("Submitting with values:", values);
            handleSubmit(values);
          },
          (errors) => {
            console.log("Validation failed:", errors);
          }
        )}
        style={{ width: "100%" }}
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
            {/* LEFT: FORM */}
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="lg">
                <div>
                  <Title order={2} fw={600}>
                    Volunteer Registration
                  </Title>
                  <Text c="dimmed" size="sm" mt={4}>
                    Create your Cornerstone Connections volunteer account to
                    sign up for events and track your hours.
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
                    <TextInput label="City" {...form.getInputProps("city")} />
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

                  {/* Driver's license + transportation */}
                  <Grid.Col span={12}>
                    <Text fw={500} size="sm" mb={4}>
                      Do you have a valid driver’s license and access to
                      transportation?
                    </Text>
                    <Radio.Group
                      {...form.getInputProps("driverLicenseTransportation")}
                    >
                      <Group gap="md">
                        <Radio value="yes" label="Yes" />
                        <Radio value="no" label="No" />
                      </Group>
                    </Radio.Group>
                  </Grid.Col>

                  {/* Roles */}
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
                        {
                          value: "clothing",
                          label: "Community Clothing Closet",
                        },
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

                {/* Languages & Restrictions */}
                <Divider
                  label="Languages & Restrictions"
                  labelPosition="left"
                />

                <Stack gap="md">
                  <div>
                    <Text fw={500} size="sm" mb={4}>
                      What languages do you speak and write fluently?
                    </Text>
                    <MultiSelect
                      placeholder="Select all that apply"
                      data={[
                        { value: "english", label: "English" },
                        { value: "spanish", label: "Spanish" },
                        { value: "haitian_creole", label: "Haitian Creole" },
                        { value: "other", label: "Other" },
                      ]}
                      withAsterisk
                      {...form.getInputProps("languages")}
                    />
                    {form.values.languages.includes("other") && (
                      <TextInput
                        mt="sm"
                        label="Other language(s)"
                        placeholder="Please specify"
                        {...form.getInputProps("otherLanguageDetail")}
                      />
                    )}
                  </div>

                  <div>
                    <Text fw={500} size="sm" mb={4}>
                      Any restrictions?
                    </Text>
                    <Text size="sm" c="dimmed" mb={4}>
                      Can you lift up to 15 lbs., twist, bend, squat, walk, and
                      sit for extended periods of time?
                    </Text>
                    <Radio.Group {...form.getInputProps("canLiftMove")}>
                      <Group gap="md">
                        <Radio value="yes" label="Yes" />
                        <Radio value="no" label="No" />
                        <Radio
                          value="depends"
                          label="Depends on the activity"
                        />
                      </Group>
                    </Radio.Group>

                    <Textarea
                      mt="sm"
                      label="Any additional restrictions"
                      placeholder="Describe any physical limitations we should be aware of"
                      autosize
                      minRows={2}
                      {...form.getInputProps("additionalRestrictions")}
                    />
                  </div>

                  <TextInput
                    label="Any allergies?"
                    placeholder="List any allergies (food, environmental, etc.)"
                    {...form.getInputProps("allergies")}
                  />
                </Stack>

                <Divider label="Availability" labelPosition="left" />

                <Stack gap="sm">
                  {days.map((d) => (
                    <Card
                      key={d.key}
                      withBorder
                      radius="md"
                      padding="md"
                      style={{
                        backgroundColor: "var(--mantine-color-gray-0)",
                      }}
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
                            setAvailability(
                              d.key,
                              "afternoon",
                              e.target.checked
                            )
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
                            onClick={() => removeEmergencyContact(index)}
                          >
                            <IconTrash
                              style={{ width: rem(16), height: rem(16) }}
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

                <Divider
                  label="Policies & Background Check"
                  labelPosition="left"
                />

                <Stack gap="sm">
                  <Checkbox
                    label={
                      <Text size="sm">
                        I agree to follow all organizational policies, including
                        confidentiality and child protection guidelines.
                      </Text>
                    }
                    {...form.getInputProps("agreesToPolicies", {
                      type: "checkbox",
                    })}
                  />

                  <div>
                    <Text fw={500} size="sm" mb={4}>
                      Can you pass a criminal background check?
                    </Text>
                    <Radio.Group {...form.getInputProps("backgroundCheckPass")}>
                      <Group gap="md">
                        <Radio value="yes" label="Yes" />
                        <Radio value="no" label="No" />
                      </Group>
                    </Radio.Group>

                    {form.values.backgroundCheckPass === "no" && (
                      <Textarea
                        mt="sm"
                        label="If no, please explain"
                        placeholder="You may briefly describe anything you feel is important for us to know."
                        autosize
                        minRows={2}
                        {...form.getInputProps("backgroundCheckExplanation")}
                      />
                    )}
                  </div>
                </Stack>

                <Divider label="Minors (Under 18)" labelPosition="left" />

                <Stack gap="sm">
                  <div>
                    <Text fw={500} size="sm" mb={4}>
                      Are you under 18 years of age?
                    </Text>
                    <Radio.Group {...form.getInputProps("isMinor")}>
                      <Group gap="md">
                        <Radio value="yes" label="Yes" />
                        <Radio value="no" label="No" />
                      </Group>
                    </Radio.Group>
                  </div>

                  {form.values.isMinor === "yes" && (
                    <Paper
                      withBorder
                      radius="md"
                      p="md"
                      style={{
                        backgroundColor: "var(--mantine-color-gray-0)",
                      }}
                    >
                      <Text fw={500} size="sm" mb="xs">
                        Parent / Guardian Information (required for minors)
                      </Text>

                      <Grid gutter="md">
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label="Parent / Guardian Name"
                            placeholder="Full name"
                            withAsterisk
                            {...form.getInputProps("minorGuardianName")}
                          />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label="Relationship"
                            placeholder="e.g., Mother, Father, Legal Guardian"
                            withAsterisk
                            {...form.getInputProps("minorGuardianRelationship")}
                          />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label="Parent / Guardian Phone"
                            placeholder="(555) 123-4567"
                            withAsterisk
                            {...form.getInputProps("minorGuardianPhone")}
                          />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label="Parent / Guardian Email"
                            placeholder="guardian@example.com"
                            withAsterisk
                            {...form.getInputProps("minorGuardianEmail")}
                          />
                        </Grid.Col>
                      </Grid>

                      <Checkbox
                        mt="sm"
                        label={
                          <Text size="sm">
                            I am the parent/guardian of this minor and I give
                            permission for them to volunteer with Cornerstone
                            Connections, including participation in required
                            screenings and background checks as applicable.
                          </Text>
                        }
                        {...form.getInputProps("minorGuardianConsent", {
                          type: "checkbox",
                        })}
                      />
                    </Paper>
                  )}
                </Stack>

                <Checkbox
                  mt="sm"
                  label={
                    <Text size="sm">
                      I certify that the above information is accurate. I
                      understand I am volunteering and not entering an
                      employment contract.
                    </Text>
                  }
                  {...form.getInputProps("agree", { type: "checkbox" })}
                />

                <Stack gap="xs">
                  <Button size="md" radius="md" type="submit">
                    Create Account
                  </Button>

                  <Text size="sm" ta="center" c="dimmed">
                    Already have an account?{" "}
                    <Text component="a" href="/login" fw={500} c="blue">
                      Log in
                    </Text>
                  </Text>
                </Stack>
              </Stack>
            </Grid.Col>

            {/* RIGHT: INFO PANEL */}
            <Grid.Col
              span={{ base: 12, md: 5 }}
              style={{ borderLeft: "1px solid var(--mantine-color-gray-3)" }}
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

                <Text size="sm">
                  We connect passionate volunteers with real community needs.
                  Whether you're supporting outreach events, helping families,
                  or assisting with operations, your time directly impacts the
                  people we serve.
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

                <Paper withBorder radius="md" p="md">
                  <Title order={4} fw={600}>
                    Need help registering?
                  </Title>

                  <Stack gap={6} mt="sm">
                    <Flex align="center" gap={8}>
                      <IconPhone style={{ width: 16, height: 16 }} />
                      <Text size="sm">(904) 555-1212</Text>
                    </Flex>

                    <Flex align="center" gap={8}>
                      <IconMail style={{ width: 16, height: 16 }} />
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
                    1. You'll get a confirmation email.
                    <br />
                    2. A coordinator will review your info.
                    <br />
                    3. You'll get access to upcoming events and sign-ups.
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
      </form>
    </Box>
  );
}
