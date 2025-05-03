import { BASE_URL } from "@/common/constants";
import fetchInstance from "@/common/lib/fetch-instance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  profilePictureUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await fetchInstance<{ user: User; authenticated: boolean }>(
        "/api/auth/me",
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useUserQuery();

  const login = () => {
    // Redirect to Google login
    window.location.href = `${BASE_URL}/api/auth/google`;
  };

  // Update the logout function
  const logout = async () => {
    try {
      // Call backend to clear cookie/session
      await fetchInstance("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      // Clear local state and redirect to login
      queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
