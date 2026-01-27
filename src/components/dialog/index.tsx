import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
  showCancelButton?: boolean;
  showSubmitButton?: boolean;
  cancelText?: string;
}

export function DialogNoCloseButton({
  open,
  onClose,
  title,
  description,
  icon,
  textButton = "Confirmar",
  children,
  onSubmit,
  disabled = false,
  showCancelButton = true,
  showSubmitButton = true,
  cancelText = "Cancelar",
}: DialogNoCloseButtonProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose()
    }}>
      <DialogContent className="sm:max-w-[500px] gap-6">
        <DialogHeader className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
            <div className="flex-1 space-y-1">
              <DialogTitle className="text-xl font-bold leading-none tracking-tight">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {children && (
          <div className="space-y-4">
            {children}
          </div>
        )}

        {(showCancelButton || showSubmitButton) && (
          <div className="flex gap-3 sm:justify-end">
            {showCancelButton && (
              <Button 
                variant="outline" 
                onClick={onClose}
                disabled={disabled}
                className="flex-1 sm:flex-none cursor-pointer"
              >
                {cancelText}
              </Button>
            )}
            
            {showSubmitButton && (
              <Button 
                onClick={onSubmit || onClose} 
                disabled={disabled}
                className={cn(
                  "flex-1 sm:flex-none cursor-pointer",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {disabled ? "Processando..." : textButton}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}