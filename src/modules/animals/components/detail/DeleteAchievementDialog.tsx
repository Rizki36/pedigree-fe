import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/components/ui/alert-dialog";
import { generateServiceErrorMessage } from "@/common/lib/utils";
import useDeleteAchievementMutation from "@/common/mutations/useDeleteAchievementMutation";
import type { FC } from "react";
import { toast } from "sonner";

export type DeleteAchievementDialogProps = {
  state: {
    open: boolean;
    id: string | null;
  };
  setState: (state: DeleteAchievementDialogProps["state"]) => void;
};

const DeleteAchievementDialog: FC<DeleteAchievementDialogProps> = ({
  state,
  setState,
}) => {
  const { mutateAsync, isPending } = useDeleteAchievementMutation({});
  const { open, id } = state;

  const onSubmit = async () => {
    try {
      if (!id) throw new Error("Achievement ID is required");

      await mutateAsync({
        id,
      });

      setState({ open: false, id: null });

      toast.success("Achievement deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete achievement", {
        description: generateServiceErrorMessage(error),
      });
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => setState({ open, id: null })}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to do this?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            animal.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAchievementDialog;
