import { uploadAvatar } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["myUser"] });
      toast.success("Avatar atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Erro ao atualizar avatar");
    },
  });
}
