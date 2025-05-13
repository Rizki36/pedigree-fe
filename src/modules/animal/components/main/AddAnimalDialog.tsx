import { Button } from "@/modules/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/modules/common/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/components/ui/form";
import { Input } from "@/modules/common/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddAnimalMutation from "@/modules/animal/hooks/mutations/useAddAnimalMutation";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { generateServiceErrorMessage } from "@/modules/common/lib/utils";
import useAnimalTypeListQuery from "@/modules/animal/hooks/queries/useAnimalTypeListQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/components/ui/select";
import { AnimalGender } from "@/modules/animal/types";

export type AddAnimalDialogProps = {
  state: {
    open: boolean;
  };
  setState: (state: AddAnimalDialogProps["state"]) => void;
};

const formSchema = z.object({
  animalTypeCode: z.string(),
  code: z.string(),
  name: z.string(),
  gender: z.nativeEnum(AnimalGender).optional(),
});

const AddAnimalDialog = (props: AddAnimalDialogProps) => {
  const { state, setState } = props;

  const navigate = useNavigate({ from: "/animals" });

  const { data: animalTypeListData } = useAnimalTypeListQuery();

  const { mutateAsync, isPending } = useAddAnimalMutation({
    options: {},
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalTypeCode: undefined,
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await mutateAsync({
        name: values.name,
        code: values.code,
        animalTypeCode: values.animalTypeCode,
        gender: values.gender || null,
      });

      setState({
        open: false,
      });

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
    <Dialog open={state.open} onOpenChange={(open) => setState({ open })}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Animal</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-2">
              <FormField
                control={form.control}
                name="animalTypeCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Animal Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Animal type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {animalTypeListData?.docs.map((animalType) => (
                          <SelectItem
                            key={animalType.code}
                            value={animalType.code}
                          >
                            {animalType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(AnimalGender).map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
