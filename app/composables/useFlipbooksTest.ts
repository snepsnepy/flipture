import type { Database } from "~/types/supabase";

export const useFlipbooksTest = () => {
  const client = useSupabaseClient<Database>();
  const user = useSupabaseUser();

  // Test function to insert a flipbook with PDF file
  const testCreateFlipbook = async () => {
    if (!user.value) {
      console.error("❌ No user logged in. Please log in first.");
      return null;
    }

    console.log("🔄 Creating test flipbook with PDF...");
    console.log("👤 User ID:", user.value.id);

    try {
      // Fetch the PDF file from public directory
      console.log("📁 Fetching PDF file from public directory...");
      const response = await fetch("/files/tatuaj.pdf");

      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      const file = new File([blob], "tatuaj.pdf", { type: "application/pdf" });

      console.log("📄 PDF file loaded:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      // Upload PDF to Supabase Storage
      console.log("☁️ Uploading PDF to Supabase Storage...");
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.value.id}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await client.storage
        .from("uploads")
        .upload(fileName, file);

      if (uploadError) {
        console.error("❌ Error uploading file:", uploadError);
        return null;
      }

      console.log("✅ File uploaded successfully:", uploadData);

      // Get public URL for the uploaded file
      const {
        data: { publicUrl },
      } = client.storage.from("uploads").getPublicUrl(fileName);

      console.log("🔗 Public URL:", publicUrl);

      // Create flipbook record with file data
      const testData = {
        title: "Test Flipbook " + Date.now(),
        company_name: "Test Company",
        description:
          "This is a test flipbook created from the app with PDF upload",
        pdf_file_url: publicUrl,
        pdf_file_name: file.name,
        pdf_file_size: file.size,
        user_id: user.value.id,
      };

      console.log("💾 Inserting flipbook record...");
      const { data, error } = await client
        .from("flipbooks")
        .insert(testData as unknown as never)
        .select()
        .single();

      if (error) {
        console.error("❌ Error creating flipbook:", error);
        // If database insert fails, clean up uploaded file
        await client.storage.from("uploads").remove([fileName]);
        return null;
      }

      console.log("✅ Flipbook created successfully with PDF:", data);
      return data;
    } catch (error) {
      console.error("❌ Error in test function:", error);
      return null;
    }
  };

  // Test function to get all flipbooks for current user
  const testGetFlipbooks = async () => {
    if (!user.value) {
      console.error("❌ No user logged in. Please log in first.");
      return [];
    }

    console.log("🔄 Fetching flipbooks for user:", user.value.id);

    const { data, error } = await client
      .from("flipbooks")
      .select("*")
      .eq("user_id", user.value.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching flipbooks:", error);
      return [];
    }

    console.log("✅ Found flipbooks:", data);
    return data;
  };

  // Test function to delete a flipbook
  const testDeleteFlipbook = async (flipbookId: string) => {
    if (!user.value) {
      console.error("❌ No user logged in. Please log in first.");
      return false;
    }

    console.log("🔄 Deleting flipbook:", flipbookId);

    const { error } = await client
      .from("flipbooks")
      .delete()
      .eq("id", flipbookId)
      .eq("user_id", user.value.id);

    if (error) {
      console.error("❌ Error deleting flipbook:", error);
      return false;
    }

    console.log("✅ Flipbook deleted successfully");
    return true;
  };

  // Cleanup function to remove all test files for current user
  const cleanupTestFiles = async () => {
    if (!user.value) {
      console.error("❌ No user logged in. Please log in first.");
      return false;
    }

    console.log("🧹 Cleaning up test files for user:", user.value.id);

    try {
      // List all files in user's folder
      const { data: files, error: listError } = await client.storage
        .from("uploads")
        .list(user.value.id);

      if (listError) {
        console.error("❌ Error listing files:", listError);
        return false;
      }

      if (!files || files.length === 0) {
        console.log("✅ No files to clean up");
        return true;
      }

      // Delete all files in user's folder
      const filePaths = files.map((file) => `${user.value?.id}/${file.name}`);
      const { error: deleteError } = await client.storage
        .from("uploads")
        .remove(filePaths);

      if (deleteError) {
        console.error("❌ Error deleting files:", deleteError);
        return false;
      }

      console.log(`✅ Cleaned up ${files.length} files`);
      return true;
    } catch (error) {
      console.error("❌ Error in cleanup function:", error);
      return false;
    }
  };

  return {
    testCreateFlipbook,
    testGetFlipbooks,
    testDeleteFlipbook,
    cleanupTestFiles,
  };
};
