"use client"

import ArticlePost from "@/components/article-post";
import { DialogNoCloseButton } from "@/components/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AuthGuard } from "@/guard/AuthGuard";
import { queryClient } from "@/lib/react-query";
import { getMyInformations, updateMyProfile } from "@/services/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, Camera, CheckCircle, FileText, Loader2, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Settings() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");

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

  const currentName = name ?? user?.name ?? "";
  const currentBio = bio ?? user?.bio ?? "";
  const currentEmail = email ?? user?.email ?? "";

  const mutation = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['myUser'] });
      setShowSuccessModal(true);
      setPassword("");
      setConfirmPassword("");
      setError("");
    },
    onError: () => {
      setError("Erro ao atualizar perfil. Tente novamente.");
    }
  });

  const handleSave = () => {
    setError("");

    const finalName = name ?? user?.name;
    if (!finalName || finalName.trim() === "") {
      setError("O nome de usuário não pode estar vazio!");
      return;
    }

    const finalEmail = email ?? user?.email;
    if (!finalEmail || finalEmail.trim() === "") {
      setError("O email não pode estar vazio!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalEmail)) {
      setError("Digite um email válido!");
      return;
    }

    if (password && password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    const updateData: any = {
      name: finalName.trim(),
      bio: (bio ?? user?.bio ?? "").trim(),
    };

    if (email !== undefined && email !== user?.email) {
      updateData.email = finalEmail.trim();
    }

    if (password) {
      updateData.password = password;
    }

    mutation.mutate(updateData);
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

      <AuthGuard>
        <ArticlePost>
          <div className="min-h-screen bg-background ">

              <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-28 bg-linear-to-br from-primary/10 via-primary/5 to-transparent">
                  <div className="absolute -bottom-16 left-8">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-background shadow-xl">
                        <Image
                          src="/profilePicture.png"
                          alt="Profile Picture"
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <button className="absolute bottom-2 right-2 p-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
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
                          required
                        />
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
                          required
                        />
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
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <AlertCircle className="h-3 w-3" />
                        Deixe em branco se não deseja alterar a senha
                      </p>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handleSave}
                        disabled={mutation.isPending}
                        className="flex-1 h-12 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                      <button className="flex-1 sm:flex-none h-12 px-6 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Deletar Conta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </ArticlePost>
      </AuthGuard>
    </>
  );
}