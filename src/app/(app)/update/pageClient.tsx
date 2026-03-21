import ArticlePost from "@/components/article-post"
import { AuthGuard } from "@/guard/AuthGuard"
import { Image, MessageSquare, ShieldCheck } from "lucide-react"

const updates = [
  {
    version: "v1.1.0",
    date: "21/03/2026",
    items: [
      {
        icon: ShieldCheck,
        title: "Verificação de imagem",
        description: "A segurança da nossa comunidade é uma prioridade. Por isso, implementamos um sistema automático de verificação de imagens que analisa todo conteúdo visual antes de ser publicado. Utilizando tecnologia avançada de moderação, o sistema identifica e bloqueia automaticamente imagens com conteúdo explícito, violento ou inapropriado. Isso garante que o Newest continue sendo um ambiente seguro e agradável para todos os usuários, sem que você precise se preocupar com o que vai encontrar no feed.",
        color: "text-green-500",
        bg: "bg-green-500/10",
        image: "/updates/conteudo-filtrado.png",
      },
      {
        icon: MessageSquare,
        title: "Menções a usuários",
        description: "Agora ficou muito mais fácil conectar pessoas nas suas publicações. Com o sistema de menções, você pode marcar qualquer usuário digitando @ seguido do nome dele em posts e comentários. Um dropdown de sugestões aparece automaticamente enquanto você digita, facilitando encontrar quem você quer mencionar. O usuário marcado recebe uma notificação instantânea, garantindo que ele não perca o que você tem a dizer. É a forma perfeita de iniciar conversas, marcar amigos em publicações relevantes ou dar crédito a quem merece.",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        image: "/updates/mention.png",
      },
      {
        icon: Image,
        title: "Até 3 imagens por post",
        description: "Uma imagem vale mais que mil palavras — imagine três. Agora você pode adicionar até 3 imagens em cada publicação, tornando seus posts muito mais ricos e expressivos. As imagens são exibidas em um carrossel elegante com navegação intuitiva, e contam com um efeito de fundo desfocado que se adapta automaticamente às proporções de cada foto, seja ela horizontal, vertical ou quadrada. Compartilhe momentos, conquistas ou ideias com muito mais contexto visual do que antes.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        image: "/updates/three-images.png",
      },
    ],
  },
]

export default function UpdatesPage() {
  return (
    <AuthGuard>
      <ArticlePost>
        <div className="border-b border-neutral-800 bg-neutral-900 px-4 py-3 sticky top-0 z-10">
          <h1 className="text-2xl font-medium">Atualizações</h1>
        </div>

        <div className="p-4 space-y-8">
          {updates.map((update) => (
            <div key={update.version} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{update.version}</span>
                <span className="text-sm text-muted-foreground">{update.date}</span>
              </div>

              <div className="space-y-3">
                {update.items.map((item) => (
                  <div key={item.title} className="flex flex-col bg-card border border-border rounded-xl overflow-hidden">
                    <div className="flex items-start gap-3 p-4">
                      <div className={`p-2 rounded-lg shrink-0 ${item.bg}`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                    </div>
                    {item.image && (
                      <div className="px-4 pb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full rounded-lg border border-border object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ArticlePost>
    </AuthGuard>
  )
}