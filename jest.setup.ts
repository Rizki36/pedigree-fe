import "@testing-library/jest-dom";
import { Link } from "./__mocks__/react-router";

// Mock matchMedia to avoid errors in tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class IntersectionObserver {
  // @ts-expect-error
  constructor(callback) {
    // @ts-expect-error
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

// @ts-expect-error
global.IntersectionObserver = IntersectionObserver;

// Suppress React 18 console errors
const originalConsoleError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalConsoleError(...args);
};

// Mock the constants module
jest.mock("@/modules/common/constants", () => ({
  BASE_URL: "http://localhost:3011",
}));

// Mock the router Link component
jest.mock("@tanstack/react-router", () => ({
  ...jest.requireActual("@tanstack/react-router"),
  useNavigate: jest.fn(() => jest.fn()),
  Link: Link,
}));

// Mock useUserQuery hook from AuthContext
jest.mock(
  "@/modules/auth/hooks/queries/useUserQuery",
  jest.fn(() => ({
    data: {
      id: "",
      email: "",
      name: "",
      profilePictureUrl: "",
    },
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
  })),
);

jest.mock("@/modules/auth/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));
