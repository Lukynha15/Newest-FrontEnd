"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { useRef, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

import { useAuth } from "@/hooks/useAuth"

import { useCloudinaryUpload } from "@/hooks/use-cloudinary"
import { RegisterFormData, RegisterSchema } from "@/schemas/register.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Check, CircleX, Eye, EyeClosed, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { DialogNoCloseButton } from "../dialog"

export function CardDemo() {
  const { register: registerUser } = useAuth();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openSucess, setOpenSucess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { uploadImage, uploading } = useCloudinaryUpload();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false)


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecione uma imagem válida');
      setOpenError(true);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('A imagem deve ter no máximo 5MB');
      setOpenError(true);
      return;
    }

    setAvatar(file);
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      let avatarUrl: string | null = null;

      if (avatar) {
        avatarUrl = await uploadImage(avatar);
      }

      await registerUser(data.name, data.email, data.password, data.bio, avatarUrl);
      setOpenSucess(true);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || 'Erro ao criar conta');
      setOpenError(true);
    }
  };

  function handleCloseSucess() {
    setOpenSucess(false);
    router.push("/login");
  }

  function handleCloseError() {
    setOpenError(false);
  }

  return (
    <>
      <DialogNoCloseButton
        open={openError}
        onClose={handleCloseError}
        title={errorMessage || "Erro ao criar conta"}
        description="Verifique os dados e tente novamente."
        icon={<CircleX className="text-red-500" />}
        showCancelButton={false}
        textButton="Entendi"
      />
      <DialogNoCloseButton
        open={openSucess}
        onClose={handleCloseSucess}
        title="Conta criada com sucesso!"
        description="Agora você pode logar com suas credenciais."
        icon={<Check className="text-green-500" />}
        showCancelButton={false}
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Insira seus dados abaixo e crie sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4">
                <Label>Foto de perfil (opcional)</Label>
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-background shadow-lg bg-muted">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <Camera className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Camera className="w-4 h-4" />
                  </button>

                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="absolute top-0 right-0 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Usuário</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Fulano"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Biografia (opcional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você..."
                  className="resize-none h-20"
                  {...register('bio')}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="meuemail@exemplo.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  icon={
                    <button type="button" className="cursor-pointer pt-1.5" onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                    </button>

                  }
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={isSubmitting || uploading}>
                  {uploading ? 'Enviando imagem...' : isSubmitting ? 'Criando conta...' : 'Criar conta'}
                </Button>
                <Button
                  type="button"
                  className="w-full mt-3"
                  onClick={() => router.push('/login')}
                  variant="outline"
                >
                  Já tenho uma conta
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}