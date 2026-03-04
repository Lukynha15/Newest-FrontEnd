'use client';

import { useCloudinaryUpload } from "@/hooks/use-cloudinary";


export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const { uploadImage, uploading } = useCloudinaryUpload();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    onUpload(url);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {uploading && <p>Enviando...</p>}
    </div>
  );
}