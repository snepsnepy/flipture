import type { Database } from "~/types/supabase";
import { useToast } from "~/composables/useToast";
import { type FlipbookFormData, Toast } from "~/types";

type ValidationResponse =
  | {
      success: true;
      plan: string;
      limits: {
        maxFlipbooks: number;
        maxFileSize: number;
        currentFlipbooks: number;
        remainingFlipbooks: number;
      };
    }
  | {
      success: false;
      error: string;
      message: string;
      limit?: number;
      currentValue?: number;
    };


export const useCreateFlipbook = () => {
  const { showToast } = useToast();
  const { isFileSizeValid, getFileSizeErrorMessage } = useSubscriptionLimits();
  const isLoading = ref(false);

  const createFlipbook = async (formData: FlipbookFormData) => {
    if (!formData.file || !formData.title.trim()) {
      showToast(Toast.ERROR, {
        toastTitle: "Missing required information",
        description:
          "Please make sure you have uploaded a file and entered a title.",
      });
      return { success: false, error: "Missing required information" };
    }

    // Validate file size based on subscription plan (client-side)
    if (!isFileSizeValid(formData.file.size)) {
      const errorMessage = getFileSizeErrorMessage(formData.file.size);
      showToast(Toast.ERROR, {
        toastTitle: "File Too Large",
        description: errorMessage,
        duration: 6000,
        action: {
          label: "Upgrade",
          onClick: () => {
            navigateTo("/pricing");
          },
        },
      });
      return { success: false, error: "File size exceeds plan limit" };
    }

    isLoading.value = true;

    // Declared outside try so the catch block can access them for cleanup
    const client = useSupabaseClient<Database>();
    const user = useSupabaseUser();
    let uploadedFileName: string | null = null;

    try {
      if (!user.value) {
        throw new Error("User not authenticated");
      }

      // Pre-upload server check: fast-fail before wasting bandwidth on the file
      // upload. The create endpoint re-validates everything authoritatively, but
      // this saves the round-trip when we already know it will be rejected.
      const validationResponse = await $fetch<ValidationResponse>(
        "/api/flipbooks/validate-create",
        {
          method: "POST",
          body: {
            userId: user.value.sub,
            fileSize: formData.file.size,
            coverOption: formData.coverOption,
            backgroundGradient: formData.backgroundGradient || "deep-white",
          },
        }
      );

      if (!validationResponse.success) {
        let toastTitle = "Limit Reached";
        if (validationResponse.error === "premium_feature_required") {
          toastTitle = "Pro Feature";
        } else if (validationResponse.error === "file_size_exceeded") {
          toastTitle = "File Too Large";
        }
        showToast(Toast.ERROR, {
          toastTitle,
          description: validationResponse.message || validationResponse.error,
          duration: 6000,
          action: {
            label: "Upgrade",
            onClick: () => {
              navigateTo("/pricing");
            },
          },
        });
        return {
          success: false,
          error: validationResponse.message || validationResponse.error,
        };
      }

      // Upload file to Supabase Storage
      const fileExt = formData.file.name.split(".").pop();
      uploadedFileName = `${user.value.sub}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await client.storage
        .from("uploads")
        .upload(uploadedFileName, formData.file);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL for the uploaded file
      const {
        data: { publicUrl },
      } = client.storage.from("uploads").getPublicUrl(uploadedFileName);

      // Server-side INSERT — the server re-reads the user's plan from the
      // database and enforces premium-feature restrictions, so client-side
      // state manipulation cannot influence what is stored.
      await $fetch("/api/flipbooks/create", {
        method: "POST",
        body: {
          userId: user.value.sub,
          title: formData.title,
          company: formData.company,
          description: formData.description,
          pdfFileUrl: publicUrl,
          pdfFileName: formData.file.name,
          pdfFileSize: formData.file.size,
          coverOption: formData.coverOption,
          backgroundGradient: formData.backgroundGradient || "deep-white",
        },
      });

      // Insert succeeded — nothing to clean up
      uploadedFileName = null;
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Error creating flipbook:", error);

      // Clean up the orphaned storage file when the insert was rejected
      if (uploadedFileName) {
        await client.storage
          .from("uploads")
          .remove([uploadedFileName])
          .catch(() => {});
      }

      const message: string =
        error?.data?.statusMessage ?? error?.message ?? "Something went wrong";
      showToast(Toast.ERROR, {
        toastTitle: "Error creating flipbook",
        description: message,
      });
      return { success: false, error: message };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    createFlipbook,
    isLoading: readonly(isLoading),
  };
};
