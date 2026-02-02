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
    <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

        <div className="space-y-8 text-center md:text-left order-2 md:order-1">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-white">Newest</h3>
            <div className="w-16 h-1 bg-neutral-700 mt-2"></div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
            </span>
            <span className="text-sm text-neutral-400 font-medium">Mais de 10 mil membros ativos</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Junte-se à nossa
              <span className="block text-neutral-300">
                comunidade
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-neutral-500 font-light">
              Compartilhe seus pensamentos
            </h2>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-3 text-neutral-400">
                <svg className="w-5 h-5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Conecte-se com pessoas do mundo todo</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <svg className="w-5 h-5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Compartilhe ideias e experiências</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <svg className="w-5 h-5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Crie conteúdo de forma simples e rápida</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={handleRegister}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg overflow-hidden cursor-pointer hover:bg-neutral-200 transition-colors"
            >
              <span className="relative flex items-center justify-center gap-2">
                Cadastrar gratuitamente
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button
              onClick={handleLogin}
              className="px-8 py-4 bg-neutral-900 text-white font-semibold rounded-lg border-2 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-200 cursor-pointer"
            >
              Entrar
            </button>
          </div>

          <p className="text-sm text-neutral-600 flex items-center justify-center md:justify-start gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
            </svg>
            Desenvolvido com Next.js
          </p>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative group">

            <div className="absolute -inset-1 bg-neutral-800/30 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-500"></div>

            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 group-hover:border-neutral-700 transition-colors duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-neutral-900/20 via-transparent to-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Conexão entre países"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="absolute -top-4 -right-4 bg-neutral-900 border border-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm font-semibold">
              Em alta
            </div>
          </div>
        </div>

      </div>

      <div className="fixed top-20 left-10 w-96 h-96 bg-neutral-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-neutral-800/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  )
} 