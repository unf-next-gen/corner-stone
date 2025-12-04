// Event data types
export interface EventData {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  capacity: number;
  enrollment_type: "auto" | "manual";
  status: "draft" | "active" | "cancelled";
  created_by: string;
  created_at: string;
  updated_at: string;
  tags?: TagData[];
}

export interface TagData {
  id: string;
  name: string;
  color: string;
}

export interface SupabaseEventRow {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  capacity: number;
  enrollment_type: string;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseTagRow {
  id: string;
  name: string;
  color: string;
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface EventFormData {
  title?: string;
  description?: string;
  event_date?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  capacity?: string | number;
  enrollment_type?: string;
}

// Component prop types
export interface EventFormProps {
  event?: EventData | null;
  mode?: "create" | "edit";
}

export interface EventCardProps {
  event: EventData;
  onEdit?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}

export interface ChangePreviewProps {
  oldData: Record<string, unknown>;
  newData: Record<string, unknown>;
  fields: Array<{ key: string; label: string }>;
}

export interface EventDetailsClientProps {
  event: EventData | null;
}

export interface EventsClientProps {
  activeEvents: EventData[];
  allEvents: EventData[];
}
