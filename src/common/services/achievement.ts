import fetchInstance from "../lib/fetch-instance";
import type {
  DeleteAchievementBody,
  DeleteAchievementResponse,
  GetAchievementListQuery,
  GetAchievementListResponse,
  PostAchievementBody,
  PostAchievementResponse,
  UpdateAchievementBody,
  UpdateAchievementResponse,
} from "./achievement.type";

const achievementService = {
  getAchievementList: async ({
    query,
  }: {
    query?: GetAchievementListQuery;
  }) => {
    return fetchInstance<GetAchievementListResponse>("/v1/achievement/list", {
      method: "GET",
      query,
    });
  },
  postAchievement: async ({
    body,
  }: {
    body: PostAchievementBody;
  }) => {
    return fetchInstance<PostAchievementResponse>("/v1/achievement", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
  deleteAchievement: async ({
    body,
  }: {
    body: DeleteAchievementBody;
  }) => {
    return fetchInstance<DeleteAchievementResponse>("/v1/achievement", {
      method: "DELETE",
      body: JSON.stringify(body),
    });
  },
  updateAchievement: async ({
    body,
  }: {
    body: UpdateAchievementBody;
  }) => {
    return fetchInstance<UpdateAchievementResponse>("/v1/achievement", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
};

export default achievementService;
