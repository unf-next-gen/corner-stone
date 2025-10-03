"use server";

import { createServerClient } from "@/app/global/util/supabase/server";

interface UploadResult {
  success: boolean;
  error?: string;
  uploadedFiles?: Array<{
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
}

export async function uploadDocuments(
  formData: FormData
): Promise<UploadResult> {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    // we check if the required fields are included
    if (!firstName || !lastName || !email) {
      return {
        success: false,
        error: "First name, last name, and email are required.",
      };
    }

    const supabase = await createServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // Extract files from FormData (optional for testing)
    const files: Array<{ file: File; index: number }> = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        const index = parseInt(key.split("_")[1]);
        files.push({ file: value, index });
      }
    }


    if (files.length > 0) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      for (const { file } of files) {
        if (file.size > maxSize) {
          return {
            success: false,
            error: `File ${file.name} is too large. Maximum size is 10MB.`,
          };
        }
      }
    }

    // here we upload the files to Supabase Storage
    const uploadedFiles = [];

    if (files.length > 0) {
      const timestamp = Date.now();

      for (const { file, index } of files) {
        try {
          // Create a unique filename
          const fileName = `${timestamp}_${index}_${file.name}`;
          const filePath = `volunteer-documents/${email}/${fileName}`;

          // Upload file to Supabase Storage
          const { data: uploadData, error: uploadError } =
            await supabase.storage
              .from("volunteer-documents")
              .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
              });

          if (uploadError) {

            return {
              success: false,
              error: `Failed to upload file ${file.name}: ${uploadError.message}`,
            };
          }

          // Get public URL for the uploaded file
          const { data: urlData } = supabase.storage
            .from("volunteer-documents")
            .getPublicUrl(filePath);

          uploadedFiles.push({
            name: file.name,
            size: file.size,
            type: file.type,
            url: urlData.publicUrl,
          });
        } catch (fileError) {
          return {
            success: false,
            error: `Failed to process file ${file.name}`,
          };
        }
      }
    }

    // Store volunteer information in database

    const { data: dbData, error: dbError } = await supabase
      .from("volunteers")
      .upsert(
        {
          email,
          first_name: firstName,
          last_name: lastName,
          phone: phone || null,
          documents: uploadedFiles,
          is_processed: false,
        },
        {
          onConflict: "email",
        }
      );

    if (dbError) {

      return {
        success: false,
        error: "Failed to save volunteer information to database.",
      };
    }


    return {
      success: true,
      uploadedFiles,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}
