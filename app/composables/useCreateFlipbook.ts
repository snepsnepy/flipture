import type { Database } from "~/types/supabase";
import { useToast } from "~/composables/useToast";
import { type FlipbookFormData, Toast } from "~/types";

export const useCreateFlipbook = () => {
  const { showToast } = useToast();
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

    isLoading.value = true;

    try {
      const client = useSupabaseClient<Database>();
      const user = useSupabaseUser();

      if (!user.value) {
        throw new Error("User not authenticated");
      }

      // Upload file to Supabase Storage
      const fileExt = formData.file.name.split(".").pop();
      const fileName = `${user.value.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await client.storage
        .from("uploads")
        .upload(fileName, formData.file);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL for the uploaded file
      const {
        data: { publicUrl },
      } = client.storage.from("uploads").getPublicUrl(fileName);

      // Create flipbook record
      const { error } = await client
        .from("flipbooks")
        .insert({
          title: formData.title,
          company_name: formData.company,
          description: formData.description,
          user_id: user.value.id,
          pdf_file_url: publicUrl,
          pdf_file_name: formData.file.name,
          pdf_file_size: formData.file.size,
          cover_options: formData.coverOption,
          background_gradient: formData.backgroundGradient || "deep-white",
        } as unknown as never)
        .single();

      if (error) {
        // If database insert fails, clean up uploaded file
        await client.storage.from("uploads").remove([fileName]);
        throw new Error(`Database error: ${error.message}`);
      }

      return { success: true, error: null };
    } catch (error: any) {
      console.error("Error creating flipbook:", error);
      showToast(Toast.ERROR, {
        toastTitle: "Error creating flipbook",
        description: error.message,
      });
      return { success: false, error: error.message };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    createFlipbook,
    isLoading: readonly(isLoading),
  };
};
