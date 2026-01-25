import { Textarea } from "@/components/ui/textarea"

interface TextareaDemoProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function TextareaDemo({ placeholder, value, onChange }: TextareaDemoProps) {
  return <Textarea placeholder={placeholder} value={value} onChange={onChange} />
}