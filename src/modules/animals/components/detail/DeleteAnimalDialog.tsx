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
import { Button } from "@/common/components/ui/button";

import { generateServiceErrorMessage } from "@/common/lib/utils";
import useDeleteAnimalMutation from "@/common/mutations/useDeleteAnimalMutation";
import { Route } from "@/routes/animals/$animalId";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TbTrash } from "react-icons/tb";
import { toast } from "sonner";

const DeleteAnimalDialog = () => {
  const { animalId } = Route.useParams();
  const navigate = useNavigate({ from: "/animals/$animalId" });
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useDeleteAnimalMutation({});

  const onSubmit = async () => {
    try {
      await mutateAsync({
        id: animalId,
      });

      await navigate({
        to: "/animals",
      });

      setOpen(false);

      toast.success("Animal deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete animal", {
        description: generateServiceErrorMessage(error),
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="sm"
        className="opacity-50 hover:opacity-100"
        onClick={() => setOpen(true)}
      >
        <TbTrash className="size-2" />
        Delete
      </Button>
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
