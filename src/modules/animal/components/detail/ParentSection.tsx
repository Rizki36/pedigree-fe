import { Button } from "@/modules/common/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/modules/common/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/modules/common/components/ui/popover";
import { cn, generateServiceErrorMessage } from "@/modules/common/lib/utils";
import useUpdateAnimalMutation from "@/modules/animal/hooks/mutations/useUpdateAnimalMutation";
import useAnimalListQuery from "@/modules/animal/hooks/queries/useAnimalListQuery";
import useInfiniteAnimalListQuery from "@/modules/animal/hooks/queries/useInfiniteAnimalListQuery";
import type { Animal } from "@/modules/animal/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronsUpDown,
  PencilIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import { type FC, useState, useMemo, useCallback } from "react";
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
  // State for search queries
  const [fatherSearchQuery, setFatherSearchQuery] = useState("");
  const [motherSearchQuery, setMotherSearchQuery] = useState("");

  // Form setup with initial values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fatherId: father?.id ? father.id : null,
      motherId: mother?.id ? mother.id : null,
    },
  });

  // Watch for changes to the father and mother IDs
  const selectedFatherId = form.watch("fatherId");
  const selectedMotherId = form.watch("motherId");

  // Fetch the selected father directly
  const { data: selectedFatherData } = useAnimalListQuery({
    query: {
      id_eq: selectedFatherId!,
    },
    options: {
      enabled: !!selectedFatherId,
    },
  });

  // Get the selected father from the direct query
  const selectedFather = selectedFatherData?.docs?.[0];

  // Fetch the selected mother directly
  const { data: selectedMotherData } = useAnimalListQuery({
    query: {
      id_eq: selectedMotherId!,
    },
    options: {
      enabled: !!selectedMotherId,
    },
  });

  // Get the selected mother from the direct query
  const selectedMother = selectedMotherData?.docs?.[0];

  // Infinite query for fathers (options list)
  const {
    data: infiniteFatherData,
    fetchNextPage: fetchNextFathers,
    hasNextPage: hasNextFathers,
    isFetchingNextPage: isFetchingNextFathers,
  } = useInfiniteAnimalListQuery({
    query: {
      id_ne: animal?.id,
      gender_eq: "MALE",
      animal_type_code_eq: animal?.animalTypeCode,
      search: fatherSearchQuery || undefined,
    },
    options: {
      enabled: !!animal?.id,
    },
  });

  // Infinite query for mothers (options list)
  const {
    data: infiniteMotherData,
    fetchNextPage: fetchNextMothers,
    hasNextPage: hasNextMothers,
    isFetchingNextPage: isFetchingNextMothers,
  } = useInfiniteAnimalListQuery({
    query: {
      id_ne: animal?.id,
      gender_eq: "FEMALE",
      animal_type_code_eq: animal?.animalTypeCode,
      search: motherSearchQuery || undefined,
    },
    options: {
      enabled: !!animal?.id,
    },
  });

  // Flatten the pages data for rendering the dropdowns
  const fatherList = useMemo(() => {
    return infiniteFatherData?.pages.flatMap((page) => page.docs) || [];
  }, [infiniteFatherData]);

  const motherList = useMemo(() => {
    return infiniteMotherData?.pages.flatMap((page) => page.docs) || [];
  }, [infiniteMotherData]);

  // Handle search input
  const handleFatherSearchInput = useCallback((value: string) => {
    setFatherSearchQuery(value);
  }, []);

  const handleMotherSearchInput = useCallback((value: string) => {
    setMotherSearchQuery(value);
  }, []);

  const { mutateAsync, isPending } = useUpdateAnimalMutation({
    options: {},
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
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder="Search name or code"
                        className="h-9"
                        value={fatherSearchQuery}
                        onValueChange={handleFatherSearchInput}
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

                        {/* Add load more button */}
                        {hasNextFathers && (
                          <div className="py-2 px-1 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => fetchNextFathers()}
                              disabled={isFetchingNextFathers}
                              className="w-full"
                            >
                              {isFetchingNextFathers ? (
                                <div className="flex items-center justify-center">
                                  Loading more...
                                </div>
                              ) : (
                                "Load more"
                              )}
                            </Button>
                          </div>
                        )}
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
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder="Search name or code"
                        className="h-9"
                        value={motherSearchQuery}
                        onValueChange={handleMotherSearchInput}
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

                        {/* Add load more button */}
                        {hasNextMothers && (
                          <div className="py-2 px-1 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => fetchNextMothers()}
                              disabled={isFetchingNextMothers}
                              className="w-full"
                            >
                              {isFetchingNextMothers ? (
                                <div className="flex items-center justify-center">
                                  Loading more...
                                </div>
                              ) : (
                                "Load more"
                              )}
                            </Button>
                          </div>
                        )}
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
