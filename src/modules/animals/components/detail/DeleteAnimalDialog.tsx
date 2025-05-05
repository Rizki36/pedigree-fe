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
import useDeleteAnimalMutation from "@/common/mutations/useDeleteAnimalMutation";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export type DeleteAnimalDialogProps = {
  state: {
    open: boolean;
    id: string | null;
  };
  setState: (state: DeleteAnimalDialogProps["state"]) => void;
};

const DeleteAnimalDialog = (props: DeleteAnimalDialogProps) => {
  const { state, setState } = props;
  const navigate = useNavigate({ from: "/animals/$animalId" });

  const { mutateAsync, isPending } = useDeleteAnimalMutation({});

  const onSubmit = async () => {
    try {
      if (!state.id) throw new Error("Animal ID is required");

      await mutateAsync({
        id: state.id,
      });

      await navigate({
        to: "/animals",
      });

      setState({
        open: false,
        id: null,
      });

      toast.success("Animal deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete animal", {
        description: generateServiceErrorMessage(error),
      });
    }
  };

  return (
    <AlertDialog
      open={state.open}
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

export default DeleteAnimalDialog;
