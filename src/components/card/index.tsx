"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { createUser } from "@/services/user.service";
import { useRouter } from "next/navigation"



export function CardDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      await createUser({
        name,
        email,
        password,
      });

      router.push('/home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Acesse a sua conta</CardTitle>
        <CardDescription>
          Insira suas credenciais abaixo e acesse sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Criar conta
        </Button>
      </CardFooter>
    </Card>
  )
}
