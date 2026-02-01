"use client"

import { useRouter } from "next/navigation"

export default function FirstPage() {
  const router = useRouter()


  const handleLogin = () => {
    router.push('/login')
  }

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <>
      <button onClick={handleLogin} className="cursor-pointer">Entrar</button>
      <button onClick={handleRegister} className="cursor-pointer">Cadastrar</button>
      <h1>Junte-se a nossa comunidade</h1>
      <h2>Compartilhe seus pensamentos</h2>
      <p>Desenvolvido com Next.js</p>
      <img src="firstPageImage.jpg" alt="Conexão entre países" />
    </>
  );
}