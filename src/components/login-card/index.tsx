"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { CircleX, Eye, EyeClosed } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { DialogNoCloseButton } from "../dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


export function LoginCard() {

  const router = useRouter()

  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await signIn(
        email,
        password,
      );
    } catch (error) {
      setOpen(true);
      console.log(error);
    }
  }

  return (
    <>
      <DialogNoCloseButton
        open={open}
        title="Dados incorretos"
        description="Verifique seus dados e tente novamente."
        icon={<CircleX className="text-red-500" />}
        onClose={() => setOpen(false)}
        showCancelButton={false}
        textButton="Entendi"
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Acesse a sua conta</CardTitle>
          <CardDescription>
            Insira suas credenciais abaixo e acesse sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="meuemail@exemplo.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  onChange={e => setPassword(e.target.value)}
                  required
                  icon={
                    <button type="button" className="cursor-pointer pt-1.5" onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
                    </button>

                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button type="submit" className="w-full" onClick={() => { router.push('/register') }} >
                  Criar conta
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
