export type IsoDateString = string;

export enum BreedingStatus {
  PLANNED = "PLANNED",
  BRED = "BRED",
  CONFIRMED_PREGNANT = "CONFIRMED_PREGNANT",
  EXPECTING = "EXPECTING",
  BORN = "BORN",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export type BreedingRecord = {
  id: string;
  fatherId: string;
  motherId: string;
  breedingDate: IsoDateString;
  expectedDueDate: IsoDateString | null;
  actualBirthDate: IsoDateString | null;
  litterSize: number | null;
  survivingPuppies: number | null;
  notes: string | null;
  status: BreedingStatus;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
  userId: string;

  // Relations
  father?: {
    id: string;
    name: string;
    code: string;
    gender: string | null;
  };
  mother?: {
    id: string;
    name: string;
    code: string;
    gender: string | null;
  };
  offspring?: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  aiRecommendation?: AIBreedingRecommendation;
  breedingOutcome?: BreedingOutcome;
};

export type AIBreedingRecommendation = {
  id: string;
  breedingRecordId: string | null;
  fatherId: string;
  motherId: string;
  compatibilityScore: number; // 0-100
  healthPredictionScore: number; // 0-100
  geneticDiversityScore: number; // 0-100
  inbreedingCoefficient: number; // 0-1
  predictedTraits: Record<string, any>; // JSON - Expected offspring characteristics
  riskFactors: Record<string, any>; // JSON - Potential health/genetic risks
  recommendations: Record<string, any>; // JSON - AI suggestions and reasoning
  aiModelVersion: string;
  confidence: number; // AI confidence level
  createdAt: IsoDateString;

  // Relations
  father?: {
    id: string;
    name: string;
    code: string;
  };
  mother?: {
    id: string;
    name: string;
    code: string;
  };
};

export type BreedingOutcome = {
  id: string;
  breedingRecordId: string;
  litterSize: number;
  maleCount: number;
  femaleCount: number;
  complications: string | null;
  veterinaryCare: boolean;
  notes: string | null;
  satisfactionScore: number | null; // 1-5 user satisfaction
  createdAt: IsoDateString;
  updatedAt: IsoDateString;

  // Relations
  healthRecords?: OffspringHealthRecord[];
};

export type GeneticMarker = {
  id: string;
  animalId: string;
  markerName: string; // e.g., "MDR1", "DM", "PRA", "Hip Dysplasia"
  testType: string; // "DNA", "Health Screen", "Physical Exam"
  result: string; // e.g., "Clear", "Carrier", "Affected", "Normal"
  genotype: string | null; // e.g., "AA", "Aa", "aa"
  testDate: IsoDateString;
  laboratory: string | null;
  certificate: string | null; // URL to test certificate
  createdAt: IsoDateString;
};

export type OffspringHealthRecord = {
  id: string;
  breedingOutcomeId: string;
  puppyIdentifier: string; // "Puppy 1", "Male A", etc.
  healthStatus: string; // "Healthy", "Health Issues", "Deceased"
  healthIssues: Record<string, any> | null; // JSON - Array of health problems
  veterinaryNotes: string | null;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
};

// Analytics types
export type BreedingAnalytics = {
  successRates: {
    overall: number;
    byBreedingPair: Array<{
      fatherId: string;
      motherId: string;
      successRate: number;
      totalBreedings: number;
    }>;
  };
  geneticDiversity: {
    populationScore: number;
    trends: Array<{
      date: IsoDateString;
      score: number;
    }>;
  };
  healthOutcomes: {
    averageLitterSize: number;
    survivalRate: number;
    commonHealthIssues: Array<{
      issue: string;
      frequency: number;
    }>;
  };
};

// Form types for creating/updating breeding records
export type CreateBreedingRecordData = {
  fatherId: string;
  motherId: string;
  breedingDate: string;
  expectedDueDate?: string;
  notes?: string;
  status: BreedingStatus;
};

export type UpdateBreedingRecordData = {
  id: string;
  breedingDate?: string;
  expectedDueDate?: string;
  actualBirthDate?: string;
  litterSize?: number;
  survivingPuppies?: number;
  notes?: string;
  status?: BreedingStatus;
};

// Search and filter types
export type BreedingRecordFilters = {
  search?: string;
  status?: BreedingStatus;
  fatherId?: string;
  motherId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
};

// Compatibility check result types
export type CompatibilityCheckResult = {
  compatibilityScore: number;
  healthPredictionScore: number;
  geneticDiversityScore: number;
  inbreedingCoefficient: number;
  riskFactors: Array<{
    type: "genetic" | "health" | "compatibility";
    severity: "low" | "medium" | "high";
    message: string;
    recommendation?: string;
  }>;
  overallRecommendation: "excellent" | "good" | "caution" | "not_recommended";
  reasoning: string;
};
