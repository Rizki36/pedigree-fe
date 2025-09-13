import fetchInstance from "@/modules/common/lib/fetch-instance";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types";

const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await fetchInstance<{ user: User; authenticated: boolean }>(
        "/v1/auth/me",
        {
          method: "GET",
        },
      );

      if (data.authenticated && data.user) {
        return data.user as User;
      }

      return undefined;
    },
    refetchOnMount: false,
  });
};

export default useUserQuery;
