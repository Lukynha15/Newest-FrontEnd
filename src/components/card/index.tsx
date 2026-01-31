"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { FormEvent, useState, useRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

import { useAuth } from "@/hooks/useAuth"
import { Check, CircleX, Camera, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { DialogNoCloseButton } from "../dialog"

export function CardDemo() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openSucess, setOpenSucess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await register(name, email, password, bio, avatar);
      setOpenSucess(true);
    } catch (error) {
      console.log(error);
      setErrorMessage('Email já em uso!');
      setOpenError(true);
    }
  }

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
        title={errorMessage || "Email já em uso!"}
        description="O email informado já está cadastrado no nosso sistema."
        icon={<CircleX className="text-red-500"/>}
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
          <form onSubmit={handleSubmit}>
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
                  name="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Fulano"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Biografia (opcional)</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Conte um pouco sobre você..."
                  className="resize-none h-20"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="meuemail@exemplo.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Criar conta
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