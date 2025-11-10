import { z } from "zod";
import type { EventData, ValidationResult, EventFormData } from "../types";

const eventFormSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title must be 200 characters or less")
      .trim(),
    description: z.string().optional(),
    event_date: z
      .string()
      .min(1, "Event date is required")
      .refine(
        (date) => {
          const eventDate = new Date(date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return eventDate >= today;
        },
        { message: "Event date cannot be in the past" }
      ),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
    location: z.string().min(1, "Location is required").trim(),
    capacity: z.preprocess((val) => {
      if (val === null || val === undefined) {
        return undefined;
      }
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed === "") {
          return undefined;
        }
        const parsed = parseInt(trimmed, 10);
        return isNaN(parsed) ? undefined : parsed;
      }
      if (typeof val === "number") {
        return val;
      }
      return undefined;
    }, z.number({ message: "Capacity is required" }).int("Capacity must be an integer").min(1, "Capacity must be between 1 and 500").max(500, "Capacity must be between 1 and 500")),
    enrollment_type: z.preprocess(
      (val) => {
        if (typeof val === "string" && val.trim() === "") {
          return undefined;
        }
        return val;
      },
      z
        .enum(["auto", "manual"], {
          message: "Invalid enrollment type",
        })
        .optional()
    ),
  })
  .refine(
    (data) => {
      if (!data.event_date || !data.start_time || !data.end_time) {
        return true; // Let individual field validations handle missing fields
      }
      const startDateTime = new Date(`${data.event_date}T${data.start_time}`);
      const endDateTime = new Date(`${data.event_date}T${data.end_time}`);
      return endDateTime > startDateTime;
    },
    {
      message: "End time must be after start time",
      path: ["end_time"],
    }
  );

export function validateEventFields(
  formData: FormData | EventFormData
): ValidationResult {
  const data =
    formData instanceof FormData
      ? {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          event_date: formData.get("event_date") as string,
          start_time: formData.get("start_time") as string,
          end_time: formData.get("end_time") as string,
          location: formData.get("location") as string,
          capacity: formData.get("capacity") as string,
          enrollment_type: formData.get("enrollment_type") as string,
        }
      : formData;

  const result = eventFormSchema.safeParse(data);

  if (result.success) {
    return {
      isValid: true,
      errors: {},
    };
  }

  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join(".");
    if (path && !errors[path]) {
      errors[path] = issue.message;
    }
  });

  return {
    isValid: false,
    errors,
  };
}

export function validateEventDates(
  date: string,
  startTime: string,
  endTime: string
): { isValid: boolean; error?: string } {
  if (!date || !startTime || !endTime) {
    return { isValid: false, error: "Date and times are required" };
  }

  const eventDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (eventDate < today) {
    return { isValid: false, error: "Event date cannot be in the past" };
  }

  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  if (endDateTime <= startDateTime) {
    return { isValid: false, error: "End time must be after start time" };
  }

  return { isValid: true };
}

export function validateCapacity(
  capacity: number,
  currentRegistrations: number = 0
): { isValid: boolean; error?: string } {
  if (isNaN(capacity) || capacity < 1 || capacity > 500) {
    return { isValid: false, error: "Capacity must be between 1 and 500" };
  }

  if (capacity < currentRegistrations) {
    return {
      isValid: false,
      error: `Cannot reduce capacity below current registrations (${currentRegistrations} enrolled)`,
    };
  }

  return { isValid: true };
}

export function checkSignificantChange(
  oldData: Partial<EventData>,
  newData: Partial<EventData>
): { isSignificant: boolean; changes: string[] } {
  const changes: string[] = [];
  let isSignificant = false;

  // Check date change (more than 1 day difference)
  if (oldData.event_date && newData.event_date) {
    const oldDate = new Date(oldData.event_date);
    const newDate = new Date(newData.event_date);
    const daysDiff = Math.abs(
      (newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff > 1) {
      changes.push("Event date");
      isSignificant = true;
    }
  }

  // Check time change (more than 2 hours difference)
  if (
    oldData.start_time &&
    newData.start_time &&
    oldData.event_date &&
    newData.event_date
  ) {
    const oldDateTime = new Date(`${oldData.event_date}T${oldData.start_time}`);
    const newDateTime = new Date(`${newData.event_date}T${newData.start_time}`);
    const hoursDiff = Math.abs(
      (newDateTime.getTime() - oldDateTime.getTime()) / (1000 * 60 * 60)
    );

    if (hoursDiff > 2) {
      changes.push("Event time");
      isSignificant = true;
    }
  }

  // Check location change
  if (
    oldData.location &&
    newData.location &&
    oldData.location !== newData.location
  ) {
    changes.push("Location");
    isSignificant = true;
  }

  // Check capacity reduction
  if (
    oldData.capacity &&
    newData.capacity &&
    newData.capacity < oldData.capacity
  ) {
    changes.push("Capacity");
    isSignificant = true;
  }

  return { isSignificant, changes };
}
