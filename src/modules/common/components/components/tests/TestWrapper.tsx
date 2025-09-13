import { AuthProvider } from "@/modules/auth/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TanstackQueryTestWrapper = ({
  children,
}: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const TestAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export { TanstackQueryTestWrapper, TestAuthProvider };
