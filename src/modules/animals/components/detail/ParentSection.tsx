import { Button } from "@/common/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/common/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { cn, generateServiceErrorMessage } from "@/common/lib/utils";
import useUpdateAnimalMutation from "@/common/mutations/useUpdateAnimalMutation";
import useAnimalListQuery from "@/common/queries/useAnimalListQuery";
import type { Animal } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronsUpDown,
  PencilIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Parent: FC<{ label: string; parent: Animal | undefined }> = ({
  label,
  parent,
}) => {
  return (
    <div className="bg-slate-100 px-3 py-2 rounded">
      <div className="text-neutral-500 text-xs mb-1 flex items-center justify-between">
        {label}
        {!!parent && (
          <Link
            to="/animals/$animalId"
            params={{
              animalId: parent?.id,
            }}
            target="_blank"
          >
            <SquareArrowOutUpRightIcon className="size-3" />
          </Link>
        )}
      </div>

      {parent ? (
        <div className="flex justify-between">
          <span>{parent.name ?? "{No name}"}</span>
          <span>{parent.code ?? "-"}</span>
        </div>
      ) : (
        <div>Unknown</div>
      )}
    </div>
  );
};

const ParentView: FC<{
  father: Animal | undefined;
  mother: Animal | undefined;
}> = ({ father, mother }) => {
  return (
    <div className="space-y-2">
      <Parent label="Father" parent={father} />
      <Parent label="Mother" parent={mother} />
    </div>
  );
};

const formSchema = z.object({
  motherId: z.string().nullable(),
  fatherId: z.string().nullable(),
});

const ParentForm: FC<{
  animal: Animal | undefined;
  father: Animal | undefined;
  mother: Animal | undefined;
  setEditing: (open: boolean) => void;
}> = ({ animal, father, mother, setEditing }) => {
  const { data: fatherData } = useAnimalListQuery({
    query: {
      id_ne: animal?.id,
      gender_eq: "MALE",
      animal_type_code_eq: animal?.animalTypeCode,
    },
    options: {
      enabled: !!animal?.id,
    },
  });
  const fatherList = fatherData?.docs ?? [];
  const { data: motherData } = useAnimalListQuery({
    query: {
      id_ne: animal?.id,
      gender_eq: "FEMALE",
      animal_type_code_eq: animal?.animalTypeCode,
    },
    options: {
      enabled: !!animal?.id,
    },
  });
  const motherList = motherData?.docs ?? [];

  const { mutateAsync, isPending } = useUpdateAnimalMutation({
    options: {},
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fatherId: father?.id ? father.id : null,
      motherId: mother?.id ? mother.id : null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!animal) throw new Error("Animal not found");

      await mutateAsync({
        id: animal?.id,
        fatherId: values.fatherId,
        motherId: values.motherId,
      });

      setEditing(false);

      toast.success("Parent updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update parent", {
        description: generateServiceErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fatherId"
          render={({ field }) => {
            const selectedFather = fatherList.find(
              (father) => father.id === field.value,
            );
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Father</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "flex w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? `(${selectedFather?.code}) ${selectedFather?.name || "{No name}"}`
                          : "Select father"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[320px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search name or code"
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No father found.</CommandEmpty>
                        <CommandGroup>
                          {fatherList.map((father) => (
                            <CommandItem
                              value={father.id}
                              key={father.id}
                              onSelect={() => {
                                form.setValue("fatherId", father.id);
                              }}
                            >
                              ({father.code}) {father.name || "{No name}"}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  father.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="motherId"
          render={({ field }) => {
            const selectedMother = motherList.find(
              (mother) => mother.id === field.value,
            );
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Mother</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "flex w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? `(${selectedMother?.code}) ${selectedMother?.name || "{No name}"}`
                          : "Select mother"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[320px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search name or code"
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No mother found.</CommandEmpty>
                        <CommandGroup>
                          {motherList.map((mother) => (
                            <CommandItem
                              value={mother.id}
                              key={mother.id}
                              onSelect={() => {
                                form.setValue("motherId", mother.id);
                              }}
                            >
                              ({mother.code}) {mother.name || "{No name}"}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  mother.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="mt-4" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
};

const ParentSection: FC<{
  animal: Animal | undefined;
}> = ({ animal }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: fatherData } = useAnimalListQuery({
    query: {
      id_eq: animal?.fatherId!,
    },
    options: {
      enabled: !!animal?.fatherId,
    },
  });
  const father = fatherData?.docs?.[0];

  const { data: motherData } = useAnimalListQuery({
    query: {
      id_eq: animal?.motherId!,
    },
    options: {
      enabled: !!animal?.motherId,
    },
  });
  const mother = motherData?.docs?.[0];

  return (
    <section className="py-4 px-3 rounded-lg border border-neutral-200 bg-white">
      <div className="mb-3 flex items-center justify-between">
        Parent
        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <PencilIcon />
          </Button>
        )}
      </div>

      {isEditing ? (
        <ParentForm
          animal={animal}
          father={father}
          mother={mother}
          setEditing={setIsEditing}
        />
      ) : (
        <ParentView father={father} mother={mother} />
      )}
    </section>
  );
};

export default ParentSection;
