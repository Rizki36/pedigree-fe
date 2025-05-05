import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Textarea } from "@/common/components/ui/textarea";
import { cn, generateServiceErrorMessage } from "@/common/lib/utils";
import useAddAchievementMutation from "@/common/mutations/useAddAchievementMutation";
import useUpdateAchievementMutation from "@/common/mutations/useUpdateAchievementMutation";
import type { Achievement } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type AddState = {
  mode: "add";
  data: {
    animalId: string;
  } | null;
};

type EditState = {
  mode: "edit";
  data: {
    achievement: Achievement;
    animalId: string;
    id: string;
  } | null;
};

export type AchievementDialogProps = {
  state: {
    open: boolean;
  } & (AddState | EditState);
  setState: (state: AchievementDialogProps["state"]) => void;
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  issuedBy: z.string().optional(),
  issuedAt: z.string().optional(),
  note: z.string().optional(),
});

const AchievementDialog: FC<AchievementDialogProps> = ({ state, setState }) => {
  const { open } = state;
  const { mode, data } = state;

  const { mutateAsync: addAchievement, isPending: addingAchievement } =
    useAddAchievementMutation({
      options: {},
    });
  const { mutateAsync: updateAchievement, isPending: updatingAchievement } =
    useUpdateAchievementMutation({
      options: {},
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleAddAchievement = async (values: z.infer<typeof formSchema>) => {
    try {
      if (mode !== "add") throw new Error("Invalid mode");
      if (!data?.animalId) throw new Error("Animal ID is required");

      await addAchievement({
        name: values.name,
        issuedBy: values.issuedBy,
        issuedAt: values.issuedAt,
        note: values.note,
        animalId: data.animalId,
      });
      form.reset(undefined, {
        keepDirtyValues: true,
      });
      setState({ open: false, mode: "add", data: null });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add achievement", {
        description: generateServiceErrorMessage(error),
      });
    }
  };

  const handleUpdateAchievement = async (
    values: z.infer<typeof formSchema>,
  ) => {
    try {
      if (state.mode !== "edit") throw new Error("Invalid mode");
      if (!state?.data?.id)
        throw new Error("ID is required for updating achievement");

      await updateAchievement({
        id: state.data.id,
        name: values.name,
        issuedBy: values.issuedBy,
        issuedAt: values.issuedAt,
        note: values.note,
      });
      form.reset(undefined, {
        keepDirtyValues: true,
      });
      setState({ open: false, mode: "add", data: null });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update achievement", {
        description: generateServiceErrorMessage(error),
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (mode === "add") {
      await handleAddAchievement(values);
    } else if (mode === "edit") {
      await handleUpdateAchievement(values);
    }
  };

  useEffect(() => {
    if (mode === "edit" && state.data) {
      const { achievement } = state.data;
      form.reset({
        name: achievement.name,
        issuedBy: achievement.issuedBy || undefined,
        issuedAt: achievement.issuedAt || undefined,
        note: achievement.note || undefined,
      });
    }
  }, [mode, state.data]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        console.log(open);
        setState({ ...state, open });
      }}
    >
      <DialogContent className="max-w-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Add" : "Update"} Achievement
              </DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Achievement name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issuedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issued By</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issuedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issued At</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon />
                          {field.value ? (
                            dayjs(field.value).format("DD MMM YYYY")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        withoutPortal={true}
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={
                            field.value
                              ? dayjs(field.value).toDate()
                              : undefined
                          }
                          onSelect={(day) => {
                            field.onChange(
                              day ? dayjs(day).format("YYYY-MM-DD") : null,
                            );
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional information..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={addingAchievement || updatingAchievement}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementDialog;
