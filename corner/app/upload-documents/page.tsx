"use client";

import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  FileInput,
  Group,
  List,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AlertCircle, Check, File, Upload, X } from "lucide-react";
import { useState } from "react";
import { uploadDocuments } from "./actions";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: "pending" | "uploading" | "success" | "error";
}

export default function UploadDocumentsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsUploading(true);

    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    files.forEach((file, index) => {
      submitData.append(`file_${index}`, file);
    });

    try {
      const result = await uploadDocuments(submitData);

      if (result.success) {
        const newUploadedFiles: UploadedFile[] = files.map((file, index) => ({
          id: `file_${Date.now()}_${index}`,
          name: file.name,
          type: file.type,
          size: file.size,
          status: "success",
        }));

        setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
        setFiles([]);
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });

        notifications.show({
          title: "Upload successful!",
          message: `Successfully uploaded ${files.length} document(s).`,
          color: "green",
          icon: <Check size={16} />,
        });
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      notifications.show({
        title: "Upload failed",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        color: "red",
        icon: <X size={16} />,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Container size="md" py="xl">
      <Paper shadow="sm" p="xl" radius="md">
        <Stack gap="lg">
          <div>
            <Title order={1} mb="sm">
              Volunteer Document Upload
            </Title>
            <Text c="dimmed" size="sm">
              Upload your necessary documents to be processed and attend events
              as a volunteer.
            </Text>
          </div>

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Title order={3}>Personal Information</Title>

              <Group grow>
                <TextInput
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                />
                <TextInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  required
                />
              </Group>

              <Group grow>
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
                <TextInput
                  label="Phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </Group>

              <Title order={3} mt="md">
                Documents
              </Title>

              <FileInput
                label="Upload Documents"
                placeholder="Select files to upload"
                multiple
                value={files}
                onChange={handleFileChange}
                leftSection={<Upload size={16} />}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                description="Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG"
              />

              {files.length > 0 && (
                <Card withBorder p="md">
                  <Text size="sm" fw={500} mb="sm">
                    Selected Files:
                  </Text>
                  <List size="sm">
                    {files.map((file, index) => (
                      <List.Item key={index} icon={<File size={14} />}>
                        {file.name} ({formatFileSize(file.size)})
                      </List.Item>
                    ))}
                  </List>
                </Card>
              )}

              {isUploading && (
                <Alert icon={<AlertCircle size={16} />} color="blue">
                  <Text size="sm" fw={500}>
                    Processing your submission...
                  </Text>
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                loading={isUploading}
                leftSection={<Upload size={16} />}
              >
                {isUploading ? "Processing..." : "Submit Information"}
              </Button>
            </Stack>
          </form>

          {uploadedFiles.length > 0 && (
            <div>
              <Title order={3} mb="md">
                Uploaded Documents
              </Title>
              <Stack gap="sm">
                {uploadedFiles.map((file) => (
                  <Card key={file.id} withBorder p="sm">
                    <Group justify="space-between">
                      <Group gap="sm">
                        <ThemeIcon color="green" size="sm" radius="xl">
                          <Check size={12} />
                        </ThemeIcon>
                        <div>
                          <Text size="sm" fw={500}>
                            {file.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {formatFileSize(file.size)} • {file.type}
                          </Text>
                        </div>
                      </Group>
                      <Badge color="green" size="sm">
                        {file.status}
                      </Badge>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </div>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
