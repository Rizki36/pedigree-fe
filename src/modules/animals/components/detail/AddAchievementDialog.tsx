import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Textarea } from "@/common/components/ui/textarea";
import { cn, generateServiceErrorMessage } from "@/common/lib/utils";
import useAddAchievementMutation from "@/common/mutations/useAddAchievementMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  issuedBy: z.string().optional(),
  issuedAt: z.string().optional(),
  note: z.string().optional(),
});

const AddAchievementDialog = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useAddAchievementMutation({
    options: {},
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutateAsync({
        name: values.name,
        issuedBy: values.issuedBy,
        issuedAt: values.issuedAt,
        note: values.note,
      });
      form.reset(undefined, {
        keepDirtyValues: true,
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update animal details", {
        description: generateServiceErrorMessage(error),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add Achievement</DialogTitle>
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
                      <PopoverContent className="w-auto p-0" align="start">
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
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAchievementDialog;
