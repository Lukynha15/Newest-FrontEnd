"use client"

import { DialogNoCloseButton } from "@/components/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AuthGuard } from "@/guard/AuthGuard";
import { useCloudinaryUpload } from "@/hooks/use-cloudinary";
import { queryClient } from "@/lib/react-query";
import { UpdateProfileSchema } from "@/schemas/settings.schema";
import { deleteMyAccount, getMyInformations, updateMyProfile, uploadAvatar } from "@/services/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, AlertTriangle, Camera, CheckCircle, FileText, Loader2, Lock, Mail, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function SettingsClient() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    data: user,
    isLoading: userLoading
  } = useQuery({
    queryKey: ['myUser'],
    queryFn: getMyInformations,
  });

  const [name, setName] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { uploadImage, uploading } = useCloudinaryUpload();

  const currentName = name ?? user?.name ?? "";
  const currentBio = bio ?? user?.bio ?? "";
  const currentEmail = email ?? user?.email ?? "";

  const mutation = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: async () => {
      if (avatarFile) {
        try {
          const avatarUrl = await uploadImage(avatarFile);
          await uploadAvatar(avatarUrl);
        } catch (err) {
          console.error('Erro ao fazer upload do avatar:', err);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['myUser'] });
      setShowSuccessModal(true);
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      setAvatarPreview(null);
      setAvatarFile(null);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Erro ao atualizar perfil. Tente novamente.";
      setErrors({ general: message });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      localStorage.removeItem('token');
      router.push('/');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Erro ao deletar conta. Tente novamente.";
      setErrors({ general: message });
      setShowDeleteModal(false);
    }
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({ avatar: 'Por favor, selecione uma imagem válida' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ avatar: 'A imagem deve ter no máximo 5MB' });
      return;
    }

    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    setAvatarFile(file);
    setErrors({});
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    setErrors({});

    const finalName = name ?? user?.name ?? "";
    const finalEmail = email ?? user?.email ?? "";
    const finalBio = bio ?? user?.bio ?? "";

    const result = UpdateProfileSchema.safeParse({
      name: finalName,
      email: finalEmail,
      bio: finalBio,
      password: password || '',
      confirmPassword: confirmPassword || '',
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const updateData: any = {
      name: finalName.trim(),
      bio: finalBio.trim(),
    };

    if (email !== undefined && email !== user?.email) {
      updateData.email = finalEmail.trim();
    }

    if (password) {
      updateData.password = password;
    }

    mutation.mutate(updateData);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate();
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getAvatarUrl = () => {
    if (avatarPreview) return avatarPreview;
    if (user?.avatar) return user.avatar;
    return '/profilePicture.png';
  };

  return (
    <>
      <DialogNoCloseButton
        open={mutation.isPending}
        onClose={() => { }}
        title="Atualizando perfil"
        description="Por favor, aguarde enquanto salvamos suas alterações..."
        icon={<Loader2 className="h-6 w-6 animate-spin text-primary" />}
        showCancelButton={false}
        showSubmitButton={false}
      />

      <DialogNoCloseButton
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="Perfil atualizado!"
        description="Suas alterações foram salvas com sucesso."
        icon={<CheckCircle className="h-6 w-6 text-green-500" />}
        showCancelButton={false}
        showSubmitButton={true}
        textButton="Fechar"
        onSubmit={handleCloseSuccessModal}
      />

      <DialogNoCloseButton
        open={showDeleteModal}
        onClose={handleCancelDelete}
        title="Deletar conta permanentemente?"
        description="Esta ação não pode ser desfeita. Todos os seus dados, posts e comentários serão permanentemente removidos."
        icon={<AlertTriangle className="h-6 w-6 text-destructive" />}
        textButton={deleteMutation.isPending ? "Deletando..." : "Deletar minha conta"}
        onSubmit={handleConfirmDelete}
        disabled={deleteMutation.isPending}
        showCancelButton={true}
        showSubmitButton={true}
      />

      <AuthGuard>
        <div className="h-full w-lg bg-background">
          <div className="h-full bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-28 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
              <div className="absolute -bottom-16 left-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-background shadow-xl">
                    <img
                      src={getAvatarUrl()}
                      alt="Profile Picture"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={mutation.isPending}
                    className="absolute bottom-2 right-2 p-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                  >
                    <Camera className="w-4 h-4" />
                  </button>

                  {avatarPreview && (
                    <button
                      onClick={handleRemoveAvatar}
                      className="absolute cursor-pointer top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                      title="Remover alteração"
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
                {errors.avatar && (
                  <p className="text-sm text-destructive mt-2">{errors.avatar}</p>
                )}
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                      <User className="h-5 w-5 text-primary" />
                      Informações Pessoais
                    </h2>
                    <Separator className="mb-6" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nome de usuário <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={currentName}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="h-12"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Biografia
                    </Label>
                    <Textarea
                      id="bio"
                      value={currentBio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Conte um pouco sobre você..."
                      className="min-h-[100px] resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      {currentBio.length} caracteres
                    </p>
                    {errors.bio && (
                      <p className="text-sm text-destructive">{errors.bio}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                      <Lock className="h-5 w-5 text-primary" />
                      Segurança
                    </h2>
                    <Separator className="mb-6" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      value={currentEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="seu@email.com"
                      className="h-12"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Nova senha
                      </Label>
                      <Input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        className="h-12"
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Confirmar senha
                      </Label>
                      <Input
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Digite novamente"
                        className="h-12"
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="h-3 w-3" />
                    Deixe em branco se não deseja alterar a senha
                  </p>
                </div>

                {errors.general && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span className="text-sm">{errors.general}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={mutation.isPending}
                    className="cursor-pointer flex-1 h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Salvar Alterações
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDeleteClick}
                    className="cursor-pointer flex-1 sm:flex-none h-12 px-6 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Deletar Conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    </>
  );
}