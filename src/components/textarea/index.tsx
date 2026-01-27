import { Textarea } from "@/components/ui/textarea";

interface TextareaDemoProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  defaultValue?: string;
}

export function TextareaDemo({
  placeholder,
  value,
  onChange,
  className,
  defaultValue
}: TextareaDemoProps) {
  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      defaultValue={defaultValue}
    />
  );
}
