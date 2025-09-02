import type {
  BreedingRecord,
  BreedingStatus,
  AIBreedingRecommendation,
  BreedingOutcome,
  GeneticMarker,
  CreateBreedingRecordData,
  UpdateBreedingRecordData,
  CompatibilityCheckResult,
} from "../types";

// #region GET /v1/breeding/records
export type GetBreedingRecordsQuery = {
  id_eq?: string;
  search?: string;
  status_eq?: BreedingStatus;
  father_id_eq?: string;
  mother_id_eq?: string;
  date_from?: string;
  date_to?: string;
  limit?: number;
  cursor?: string;
  skip?: number;
};

export type GetBreedingRecordsResponse = {
  docs: BreedingRecord[];
  limit: number;
  nextCursor?: string;
  hasMore: boolean;
};
// #endregion

// #region GET /v1/breeding/records/:id
export type GetBreedingRecordResponse = { doc: BreedingRecord };
// #endregion

// #region POST /v1/breeding/records
export type CreateBreedingRecordBody = CreateBreedingRecordData;
export type CreateBreedingRecordResponse = { doc: BreedingRecord };
// #endregion

// #region PUT /v1/breeding/records/:id
export type UpdateBreedingRecordBody = UpdateBreedingRecordData;
export type UpdateBreedingRecordResponse = { doc: BreedingRecord };
// #endregion

// #region DELETE /v1/breeding/records/:id
export type DeleteBreedingRecordBody = {
  id: string;
};
export type DeleteBreedingRecordResponse = { doc: BreedingRecord };
// #endregion

// #region POST /v1/breeding/records/:id/outcome
export type CreateBreedingOutcomeBody = {
  breedingRecordId: string;
  litterSize: number;
  maleCount: number;
  femaleCount: number;
  complications?: string;
  veterinaryCare: boolean;
  notes?: string;
  satisfactionScore?: number;
  healthRecords?: Array<{
    puppyIdentifier: string;
    healthStatus: string;
    healthIssues?: Record<string, any>;
    veterinaryNotes?: string;
  }>;
};
export type CreateBreedingOutcomeResponse = { doc: BreedingOutcome };
// #endregion

// #region POST /v1/breeding/ai/recommend
export type GetAIRecommendationBody = {
  fatherId: string;
  motherId: string;
};
export type GetAIRecommendationResponse = { doc: AIBreedingRecommendation };
// #endregion

// #region GET /v1/breeding/ai/compatibility/:fatherId/:motherId
export type GetCompatibilityCheckResponse = { doc: CompatibilityCheckResult };
// #endregion

// #region POST /v1/breeding/ai/batch-recommend
export type BatchRecommendationBody = {
  animalId: string; // The animal to find matches for
  candidateIds?: string[]; // Optional list of candidates, otherwise all available animals
  maxRecommendations?: number; // Default 10
};
export type BatchRecommendationResponse = {
  docs: Array<{
    candidateId: string;
    candidate: {
      id: string;
      name: string;
      code: string;
      gender: string | null;
    };
    recommendation: AIBreedingRecommendation;
  }>;
};
// #endregion

// #region GET /v1/breeding/ai/optimal-matches/:animalId
export type GetOptimalMatchesResponse = {
  docs: Array<{
    animalId: string;
    animal: {
      id: string;
      name: string;
      code: string;
      gender: string | null;
    };
    compatibilityScore: number;
    recommendation: string;
  }>;
};
// #endregion

// #region POST /v1/animals/:id/genetic-markers
export type AddGeneticMarkerBody = {
  markerName: string;
  testType: string;
  result: string;
  genotype?: string;
  testDate: string;
  laboratory?: string;
  certificate?: string;
};
export type AddGeneticMarkerResponse = { doc: GeneticMarker };
// #endregion

// #region GET /v1/animals/:id/genetic-profile
export type GetGeneticProfileResponse = {
  doc: {
    animalId: string;
    animal: {
      id: string;
      name: string;
      code: string;
    };
    markers: GeneticMarker[];
    riskAssessment: {
      overallRisk: "low" | "medium" | "high";
      knownRisks: Array<{
        marker: string;
        risk: string;
        severity: "low" | "medium" | "high";
        description: string;
      }>;
    };
  };
};
// #endregion

// #region PUT /v1/animals/:animalId/genetic-markers/:markerId
export type UpdateGeneticMarkerBody = {
  markerName?: string;
  testType?: string;
  result?: string;
  genotype?: string;
  testDate?: string;
  laboratory?: string;
  certificate?: string;
};
export type UpdateGeneticMarkerResponse = { doc: GeneticMarker };
// #endregion

// #region DELETE /v1/animals/:animalId/genetic-markers/:markerId
export type DeleteGeneticMarkerResponse = { doc: GeneticMarker };
// #endregion

// #region GET /v1/breeding/analytics/success-rate
export type GetSuccessRateAnalyticsQuery = {
  date_from?: string;
  date_to?: string;
  father_id?: string;
  mother_id?: string;
};
export type GetSuccessRateAnalyticsResponse = {
  doc: {
    overall: {
      totalBreedings: number;
      successfulBreedings: number;
      successRate: number;
    };
    byBreedingPair: Array<{
      fatherId: string;
      motherId: string;
      father: { id: string; name: string; code: string };
      mother: { id: string; name: string; code: string };
      totalBreedings: number;
      successfulBreedings: number;
      successRate: number;
    }>;
    trends: Array<{
      month: string;
      successRate: number;
      totalBreedings: number;
    }>;
  };
};
// #endregion

// #region GET /v1/breeding/analytics/genetic-diversity
export type GetGeneticDiversityAnalyticsResponse = {
  doc: {
    populationScore: number;
    trendData: Array<{
      date: string;
      score: number;
    }>;
    riskFactors: Array<{
      factor: string;
      severity: "low" | "medium" | "high";
      description: string;
      recommendation: string;
    }>;
  };
};
// #endregion

// #region GET /v1/breeding/analytics/health-trends
export type GetHealthTrendsAnalyticsQuery = {
  date_from?: string;
  date_to?: string;
};
export type GetHealthTrendsAnalyticsResponse = {
  doc: {
    averageLitterSize: number;
    survivalRate: number;
    healthMetrics: {
      totalOffspring: number;
      healthyOffspring: number;
      offspringWithIssues: number;
    };
    commonIssues: Array<{
      issue: string;
      frequency: number;
      percentage: number;
    }>;
    trends: Array<{
      month: string;
      averageLitterSize: number;
      survivalRate: number;
    }>;
  };
};
// #endregion

// #region GET /v1/breeding/analytics/lineage/:animalId
export type GetLineageAnalyticsResponse = {
  doc: {
    animalId: string;
    animal: {
      id: string;
      name: string;
      code: string;
    };
    lineageDepth: number;
    inbreedingCoefficient: number;
    commonAncestors: Array<{
      ancestorId: string;
      ancestor: {
        id: string;
        name: string;
        code: string;
      };
      pathsCount: number;
      generations: number;
    }>;
    geneticDiversityScore: number;
    healthProfile: {
      knownIssues: string[];
      riskFactors: string[];
      recommendations: string[];
    };
  };
};
// #endregion
