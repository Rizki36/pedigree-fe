import { Button } from "@/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { useForm } from "react-hook-form";
import { TiPlus } from "react-icons/ti";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddAnimalMutation from "@/common/mutations/useAddAnimalMutation";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { generateServiceErrorMessage } from "@/common/lib/utils";

const formSchema = z.object({
  code: z.string(),
  name: z.string(),
});

const AddAnimalDialog = () => {
  const navigate = useNavigate({ from: "/animals" });
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useAddAnimalMutation({
    options: {},
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await mutateAsync({
        name: values.name,
        code: values.code,
      });

      setOpen(false);

      await navigate({
        to: "/animals/$animalId",
        params: {
          animalId: res.doc.id,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add animal", {
        description: generateServiceErrorMessage(error),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <TiPlus />
          Add Animal
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Animal</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Animal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Animal name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Add Animal
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAnimalDialog;
