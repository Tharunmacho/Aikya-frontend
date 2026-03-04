// Enhanced image update handler that automatically manages old images

export const handleImageUpdate = async (oldImageUrl: string, newFile: File) => {
  try {
    // 1. Upload new image
    const uploadResponse = await uploadAPI.uploadSingle(newFile);
    
    if (uploadResponse.success) {
      // 2. Delete old image from bucket (if exists and not a placeholder)
      if (oldImageUrl && !oldImageUrl.includes('unsplash.com')) {
        try {
          await uploadAPI.deleteImage(oldImageUrl);
          console.log('🗑️ Old image cleaned up from bucket');
        } catch (error) {
          console.warn('⚠️ Could not delete old image:', error.message);
        }
      }
      
      // 3. Return new image URL
      return uploadResponse.data.url;
    }
  } catch (error) {
    throw new Error(`Image update failed: ${error.message}`);
  }
};

// Usage in CMS components:
const handleFormSubmit = async (formData) => {
  if (newImageFile && editingItem?.image) {
    // Automatically handles old image cleanup
    formData.image = await handleImageUpdate(editingItem.image, newImageFile);
  }
  
  // Proceed with normal update
  await updateItem(formData);
};