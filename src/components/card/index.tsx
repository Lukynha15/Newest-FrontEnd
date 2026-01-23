"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { FormEvent, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { useAuth } from "@/hooks/useAuth"
import { Check, CircleX } from "lucide-react"
import { useRouter } from "next/navigation"
import { DialogNoCloseButton } from "../dialog"

export function CardDemo() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSucess, setOpenSucess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await register(
        name,
        email,
        password,
      );
      setOpenSucess(true)

    } catch (error) {
      console.log(error);
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
        title="Email já em uso!"
        description="O email informado já está cadastrado no nosso sistema."
        icon={<CircleX className="text-red-500"/>}
      />
      <DialogNoCloseButton
        open={openSucess}
        onClose={handleCloseSucess}
        title="Conta criada com sucesso!"
        description="Agora voce pode logar com suas credenciais."
        icon={<Check className="text-green-500" />}
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
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Fulano"
                  required
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
                  placeholder="Senha"
                  required
                />
              </div>
              <div>
                <Button type="submit" className="w-full">
                  Criar conta
                </Button>
                <Button type="submit" className="w-full mt-3" onClick={() => router.push('/login')}>
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
