import fetchInstance from "@/modules/common/lib/fetch-instance";
import type {
  GetBreedingRecordsQuery,
  GetBreedingRecordsResponse,
  GetBreedingRecordResponse,
  CreateBreedingRecordBody,
  CreateBreedingRecordResponse,
  UpdateBreedingRecordBody,
  UpdateBreedingRecordResponse,
  DeleteBreedingRecordBody,
  DeleteBreedingRecordResponse,
  CreateBreedingOutcomeBody,
  CreateBreedingOutcomeResponse,
  GetAIRecommendationBody,
  GetAIRecommendationResponse,
  GetCompatibilityCheckResponse,
  BatchRecommendationBody,
  BatchRecommendationResponse,
  GetOptimalMatchesResponse,
  AddGeneticMarkerBody,
  AddGeneticMarkerResponse,
  GetGeneticProfileResponse,
  UpdateGeneticMarkerBody,
  UpdateGeneticMarkerResponse,
  DeleteGeneticMarkerResponse,
  GetSuccessRateAnalyticsQuery,
  GetSuccessRateAnalyticsResponse,
  GetGeneticDiversityAnalyticsResponse,
  GetHealthTrendsAnalyticsQuery,
  GetHealthTrendsAnalyticsResponse,
  GetLineageAnalyticsResponse,
} from "./breeding.type";

const breedingService = {
  // Breeding Records Management
  getBreedingRecords: async ({
    query,
  }: {
    query?: GetBreedingRecordsQuery;
  }) => {
    return fetchInstance<GetBreedingRecordsResponse>("/v1/breeding/records", {
      method: "GET",
      query,
    });
  },

  getBreedingRecord: async ({
    breedingId,
  }: {
    breedingId: string;
  }) => {
    return fetchInstance<GetBreedingRecordResponse>(
      `/v1/breeding/records/${breedingId}`,
      {
        method: "GET",
      },
    );
  },

  createBreedingRecord: async ({
    body,
  }: {
    body: CreateBreedingRecordBody;
  }) => {
    return fetchInstance<CreateBreedingRecordResponse>("/v1/breeding/records", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateBreedingRecord: async ({
    body,
  }: {
    body: UpdateBreedingRecordBody;
  }) => {
    return fetchInstance<UpdateBreedingRecordResponse>("/v1/breeding/records", {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  deleteBreedingRecord: async ({
    body,
  }: {
    body: DeleteBreedingRecordBody;
  }) => {
    return fetchInstance<DeleteBreedingRecordResponse>("/v1/breeding/records", {
      method: "DELETE",
      body: JSON.stringify(body),
    });
  },

  // Breeding Outcomes
  createBreedingOutcome: async ({
    body,
  }: {
    body: CreateBreedingOutcomeBody;
  }) => {
    return fetchInstance<CreateBreedingOutcomeResponse>(
      `/v1/breeding/records/${body.breedingRecordId}/outcome`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
  },

  // AI Recommendations
  getAIRecommendation: async ({
    body,
  }: {
    body: GetAIRecommendationBody;
  }) => {
    return fetchInstance<GetAIRecommendationResponse>(
      "/v1/breeding/ai/recommend",
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
  },

  getCompatibilityCheck: async (fatherId: string, motherId: string) => {
    return fetchInstance<GetCompatibilityCheckResponse>(
      `/v1/breeding/ai/compatibility/${fatherId}/${motherId}`,
      {
        method: "GET",
      },
    );
  },

  getBatchRecommendations: async ({
    body,
  }: {
    body: BatchRecommendationBody;
  }) => {
    return fetchInstance<BatchRecommendationResponse>(
      "/v1/breeding/ai/batch-recommend",
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
  },

  getOptimalMatches: async (animalId: string) => {
    return fetchInstance<GetOptimalMatchesResponse>(
      `/v1/breeding/ai/optimal-matches/${animalId}`,
      {
        method: "GET",
      },
    );
  },

  // Genetic Management
  addGeneticMarker: async (animalId: string, body: AddGeneticMarkerBody) => {
    return fetchInstance<AddGeneticMarkerResponse>(
      `/v1/animals/${animalId}/genetic-markers`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
  },

  getGeneticProfile: async (animalId: string) => {
    return fetchInstance<GetGeneticProfileResponse>(
      `/v1/animals/${animalId}/genetic-profile`,
      {
        method: "GET",
      },
    );
  },

  updateGeneticMarker: async (
    animalId: string,
    markerId: string,
    body: UpdateGeneticMarkerBody,
  ) => {
    return fetchInstance<UpdateGeneticMarkerResponse>(
      `/v1/animals/${animalId}/genetic-markers/${markerId}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      },
    );
  },

  deleteGeneticMarker: async (animalId: string, markerId: string) => {
    return fetchInstance<DeleteGeneticMarkerResponse>(
      `/v1/animals/${animalId}/genetic-markers/${markerId}`,
      {
        method: "DELETE",
      },
    );
  },

  // Analytics & Reporting
  getSuccessRateAnalytics: async ({
    query,
  }: {
    query?: GetSuccessRateAnalyticsQuery;
  }) => {
    return fetchInstance<GetSuccessRateAnalyticsResponse>(
      "/v1/breeding/analytics/success-rate",
      {
        method: "GET",
        query,
      },
    );
  },

  getGeneticDiversityAnalytics: async () => {
    return fetchInstance<GetGeneticDiversityAnalyticsResponse>(
      "/v1/breeding/analytics/genetic-diversity",
      {
        method: "GET",
      },
    );
  },

  getHealthTrendsAnalytics: async ({
    query,
  }: {
    query?: GetHealthTrendsAnalyticsQuery;
  }) => {
    return fetchInstance<GetHealthTrendsAnalyticsResponse>(
      "/v1/breeding/analytics/health-trends",
      {
        method: "GET",
        query,
      },
    );
  },

  getLineageAnalytics: async (animalId: string) => {
    return fetchInstance<GetLineageAnalyticsResponse>(
      `/v1/breeding/analytics/lineage/${animalId}`,
      {
        method: "GET",
      },
    );
  },
};

export default breedingService;

// Named exports for individual functions
export const {
  getBreedingRecords,
  getBreedingRecord,
  createBreedingRecord,
  updateBreedingRecord,
  deleteBreedingRecord,
  createBreedingOutcome,
  getAIRecommendation,
  getCompatibilityCheck,
  getBatchRecommendations,
  getOptimalMatches,
  addGeneticMarker,
  getGeneticProfile,
  updateGeneticMarker,
  deleteGeneticMarker,
  getSuccessRateAnalytics,
  getGeneticDiversityAnalytics,
  getHealthTrendsAnalytics,
  getLineageAnalytics,
} = breedingService;
