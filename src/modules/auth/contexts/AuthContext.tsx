import { BASE_URL } from "@/modules/common/constants";
import fetchInstance from "@/modules/common/lib/fetch-instance";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";
import useUserQuery from "@/modules/auth/hooks/queries/useUserQuery";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useUserQuery();

  const login = () => {
    // Redirect to Google login
    window.location.href = `${BASE_URL}/v1/auth/google`;
  };

  // Update the logout function
  const logout = async () => {
    try {
      // Call backend to clear cookie/session
      await fetchInstance("/v1/auth/logout", {
        method: "POST",
        body: JSON.stringify({}),
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
