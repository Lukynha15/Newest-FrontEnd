export function renderContentWithMentions(content: string) {
  const parts = content.split(/(@\w+)/g)
  return parts.map((part, i) =>
    part.startsWith('@') ? (
      <span key={i} className="bg-neutral-700 text-white font-bold rounded px-1">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}