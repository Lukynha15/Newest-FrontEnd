import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface DialogNoCloseButtonProps {
  open: boolean
  onClose: () => void
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode
  textButton?: string
  onSubmit?: () => void
  disabled?: boolean;
}

export function DialogNoCloseButton({
  open,
  onClose,
  title,
  description,
  icon,
  textButton,
  children,
  onSubmit,
  disabled = false 
}: DialogNoCloseButtonProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{icon}{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            {description}
          </DialogDescription>
          {children}
          <Button 
            onClick={onSubmit || onClose} 
            disabled={disabled}
            className="mt-2"
          >
            {textButton}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}