import { useState } from 'react';

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function uploadImage(file: File): Promise<string> {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'newest');
    formData.append('cloud_name', 'dpkbuefjr');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dpkbuefjr/image/upload`,
      { method: 'POST', body: formData }
    );

    const data = await res.json();
    setUploading(false);
    setImageUrl(data.secure_url);
    return data.secure_url;
  }

  return { uploadImage, uploading, imageUrl };
}