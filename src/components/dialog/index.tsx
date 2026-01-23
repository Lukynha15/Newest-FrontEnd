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
}

export function DialogNoCloseButton({
  open,
  onClose,
  title,
  description,
  icon,
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
          <Button onClick={onClose} className="mt-2">
            Fechar
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
