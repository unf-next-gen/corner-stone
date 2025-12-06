"use client";

import { useForm } from "@mantine/form";

const role: string[] = [];

export function useVolunteerRegister() {
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
      otherRoleDetail: "",

      driverLicenseTransportation: "", // yes | no
      languages: [] as string[], // english | spanish | haitian_creole | other
      otherLanguageDetail: "",
      canLiftMove: "", // yes | no | depends
      additionalRestrictions: "",
      allergies: "",

      agreesToPolicies: false,
      backgroundCheckPass: "", // yes | no
      backgroundCheckExplanation: "",

      isMinor: "", // yes | no
      minorGuardianName: "",
      minorGuardianRelationship: "",
      minorGuardianPhone: "",
      minorGuardianEmail: "",
      minorGuardianConsent: false,

      availability: {
        mon: { morning: false, afternoon: false, evening: false, allday: false },
        tue: { morning: false, afternoon: false, evening: false, allday: false },
        wed: { morning: false, afternoon: false, evening: false, allday: false },
        thu: { morning: false, afternoon: false, evening: false, allday: false },
        fri: { morning: false, afternoon: false, evening: false, allday: false },
        sat: { morning: false, afternoon: false, evening: false, allday: false },
        sun: { morning: false, afternoon: false, evening: false, allday: false },
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
      // account
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

      // roles
      roles: (value: string[]) =>
        value.length === 0 ? "Select at least one role" : null,
      otherRoleDetail: (value, values) =>
        values.roles.includes("other") && value.trim().length === 0
          ? "Please describe your other area(s) of interest"
          : null,

      // transportation
      driverLicenseTransportation: (value) =>
        value ? null : "Please answer this question",

      // languages
      languages: (value: string[]) =>
        value.length === 0 ? "Select at least one language" : null,
      otherLanguageDetail: (value, values) =>
        values.languages.includes("other") && value.trim().length === 0
          ? "Please specify other language(s)"
          : null,

      // restrictions
      canLiftMove: (value) =>
        value ? null : "Please select an option for physical restrictions",

      // policies / background check
      agreesToPolicies: (value) =>
        value ? null : "You must agree to the policies",
      backgroundCheckPass: (value) =>
        value ? null : "Please answer this question",
      backgroundCheckExplanation: (value, values) =>
        values.backgroundCheckPass === "no" && value.trim().length === 0
          ? "Please provide an explanation"
          : null,

      // minors
      isMinor: (value) =>
        value ? null : "Please tell us if you are under 18",

      minorGuardianName: (value, values) =>
        values.isMinor === "yes" && value.trim().length === 0
          ? "Parent/guardian name is required for minors"
          : null,

      minorGuardianRelationship: (value, values) =>
        values.isMinor === "yes" && value.trim().length === 0
          ? "Relationship is required for minors"
          : null,

      minorGuardianPhone: (value, values) =>
        values.isMinor === "yes" && value.trim().length === 0
          ? "Parent/guardian phone is required for minors"
          : null,

      minorGuardianEmail: (value, values) =>
        values.isMinor === "yes" && !/^\S+@\S+$/.test(value)
          ? "Valid parent/guardian email is required for minors"
          : null,

      minorGuardianConsent: (value, values) =>
        values.isMinor === "yes" && !value
          ? "Parent/guardian must consent for minors"
          : null,

      // final certify checkbox
      agree: (value) =>
        value ? null : "You must certify before creating an account",
    },
  });

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

  return {
    form,
    days,
    setAvailability,
    addEmergencyContact,
    removeEmergencyContact,
    updateEmergencyField,
    handleSubmit,
  };
}