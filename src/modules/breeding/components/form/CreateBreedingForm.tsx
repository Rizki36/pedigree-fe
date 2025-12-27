import type { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";

import { Button } from "@/modules/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/components/ui/select";
import { Textarea } from "@/modules/common/components/ui/textarea";
import { Badge } from "@/modules/common/components/ui/badge";
import { Calendar } from "@/modules/common/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/modules/common/components/ui/popover";
import { CalendarIcon, HeartIcon, AlertTriangleIcon } from "lucide-react";

import {
  BreedingStatus,
  type CreateBreedingRecordData,
} from "@/modules/breeding/types";
import useAnimalListQuery from "@/modules/animal/hooks/queries/useAnimalListQuery";
import useCreateBreedingRecordMutation from "@/modules/breeding/hooks/mutations/useCreateBreedingRecordMutation";
import useCompatibilityCheckQuery from "@/modules/breeding/hooks/queries/useCompatibilityCheckQuery";
import { AnimalGender } from "@/modules/animal/types";
import { generateServiceErrorMessage, cn } from "@/modules/common/lib/utils";

const formSchema = z.object({
  fatherId: z.string().min(1, "Father is required"),
  motherId: z.string().min(1, "Mother is required"),
  breedingDate: z.string().min(1, "Breeding date is required"),
  expectedDueDate: z.string().optional(),
  notes: z.string().optional(),
  status: z.nativeEnum(BreedingStatus),
});

type FormData = z.infer<typeof formSchema>;

const CreateBreedingForm: FC = () => {
  const navigate = useNavigate();
  const [breedingDate, setBreedingDate] = useState<Date>();
  const [expectedDueDate, setExpectedDueDate] = useState<Date>();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fatherId: "",
      motherId: "",
      breedingDate: "",
      expectedDueDate: "",
      notes: "",
      status: BreedingStatus.PLANNED,
    },
  });

  const fatherId = form.watch("fatherId");
  const motherId = form.watch("motherId");

  // Fetch available animals for father/mother selection
  const { data: maleAnimals } = useAnimalListQuery({
    query: {
      gender_eq: AnimalGender.MALE,
      limit: 100,
    },
  });

  const { data: femaleAnimals } = useAnimalListQuery({
    query: {
      gender_eq: AnimalGender.FEMALE,
      limit: 100,
    },
  });

  // Get compatibility check when both parents are selected
  const { data: compatibilityData, isLoading: isCheckingCompatibility } =
    useCompatibilityCheckQuery({
      fatherId: fatherId || undefined,
      motherId: motherId || undefined,
      options: {
        enabled: !!(fatherId && motherId),
      },
    });

  const { mutateAsync: createBreedingRecord, isPending } =
    useCreateBreedingRecordMutation({
      options: {
        onSuccess: (response) => {
          toast.success("Breeding record created successfully!");
          navigate({
            to: "/breeding/$breedingId",
            params: { breedingId: response.doc.id },
          });
        },
        onError: (error) => {
          toast.error(generateServiceErrorMessage(error));
        },
      },
    });

  const onSubmit = async (data: FormData) => {
    try {
      const payload: CreateBreedingRecordData = {
        fatherId: data.fatherId,
        motherId: data.motherId,
        breedingDate: data.breedingDate,
        expectedDueDate: data.expectedDueDate || undefined,
        notes: data.notes || undefined,
        status: data.status,
      };

      await createBreedingRecord({ body: payload });
    } catch (error) {
      // Error is handled by onError callback
    }
  };

  // Auto-calculate expected due date when breeding date changes
  const handleBreedingDateChange = (date: Date | undefined) => {
    setBreedingDate(date);
    if (date) {
      const dateStr = date.toISOString().split("T")[0];
      form.setValue("breedingDate", dateStr);

      // Calculate expected due date (gestation period ~ 63 days for dogs)
      const expectedDate = dayjs(date).add(63, "days").toDate();
      setExpectedDueDate(expectedDate);
      form.setValue(
        "expectedDueDate",
        expectedDate.toISOString().split("T")[0],
      );
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "excellent":
        return "text-green-600 bg-green-50";
      case "good":
        return "text-blue-600 bg-blue-50";
      case "caution":
        return "text-yellow-600 bg-yellow-50";
      case "not_recommended":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Father Selection */}
            <FormField
              control={form.control}
              name="fatherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select father" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maleAnimals?.docs.map((animal) => (
                        <SelectItem key={animal.id} value={animal.id}>
                          {animal.name} ({animal.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mother Selection */}
            <FormField
              control={form.control}
              name="motherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mother" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {femaleAnimals?.docs.map((animal) => (
                        <SelectItem key={animal.id} value={animal.id}>
                          {animal.name} ({animal.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* AI Compatibility Check */}
          {fatherId && motherId && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <HeartIcon className="h-5 w-5 text-pink-500" />
                <h3 className="font-medium">AI Compatibility Analysis</h3>
              </div>

              {isCheckingCompatibility ? (
                <div className="text-sm text-gray-500">
                  Analyzing compatibility...
                </div>
              ) : compatibilityData?.doc ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compatibility Score:</span>
                    <Badge
                      className={getCompatibilityColor(
                        compatibilityData.doc.compatibilityScore,
                      )}
                    >
                      {compatibilityData.doc.compatibilityScore}/100
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Health Prediction:</span>
                    <Badge
                      className={getCompatibilityColor(
                        compatibilityData.doc.healthPredictionScore,
                      )}
                    >
                      {compatibilityData.doc.healthPredictionScore}/100
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Genetic Diversity:</span>
                    <Badge
                      className={getCompatibilityColor(
                        compatibilityData.doc.geneticDiversityScore,
                      )}
                    >
                      {compatibilityData.doc.geneticDiversityScore}/100
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Recommendation:</span>
                    <Badge
                      className={getRecommendationColor(
                        compatibilityData.doc.overallRecommendation,
                      )}
                    >
                      {compatibilityData.doc.overallRecommendation
                        .replace("_", " ")
                        .toUpperCase()}
                    </Badge>
                  </div>

                  {compatibilityData.doc.riskFactors.length > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-1 mb-2">
                        <AlertTriangleIcon className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">
                          Risk Factors:
                        </span>
                      </div>
                      <div className="space-y-1">
                        {compatibilityData.doc.riskFactors.map((risk) => (
                          <div
                            key={`${risk.type}-${risk.severity}`}
                            className="text-xs bg-orange-50 text-orange-700 p-2 rounded"
                          >
                            <div className="font-medium">
                              {risk.type.toUpperCase()} -{" "}
                              {risk.severity.toUpperCase()}
                            </div>
                            <div>{risk.message}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-600 mt-2">
                    {compatibilityData.doc.reasoning}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Breeding Date */}
          <FormField
            control={form.control}
            name="breedingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breeding Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !breedingDate && "text-muted-foreground",
                        )}
                      >
                        {breedingDate ? (
                          dayjs(breedingDate).format("MMM DD, YYYY")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={breedingDate}
                      onSelect={handleBreedingDateChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expected Due Date */}
          <FormField
            control={form.control}
            name="expectedDueDate"
            render={() => (
              <FormItem>
                <FormLabel>Expected Due Date (Optional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !expectedDueDate && "text-muted-foreground",
                        )}
                      >
                        {expectedDueDate ? (
                          dayjs(expectedDueDate).format("MMM DD, YYYY")
                        ) : (
                          <span>Auto-calculated from breeding date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expectedDueDate}
                      onSelect={(date) => {
                        setExpectedDueDate(date);
                        if (date) {
                          form.setValue(
                            "expectedDueDate",
                            date.toISOString().split("T")[0],
                          );
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(BreedingStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional notes about this breeding..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Breeding Record"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/breeding" })}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateBreedingForm;
