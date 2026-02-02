import { Textarea } from "@/components/ui/textarea"

interface TextareaDemoProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
}

export function TextareaDemo({ placeholder, value, onChange, className }: TextareaDemoProps) {
  return <Textarea placeholder={placeholder} value={value} onChange={onChange} className={className}/>
}