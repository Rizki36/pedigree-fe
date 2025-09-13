import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "@tanstack/react-router";
import { PrivacyAgreement, SignButton } from "../index";
import Login from "../index";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import { TestAuthProvider } from "@/modules/common/components/components/tests/TestWrapper";

// Mock implementations
const mockNavigate = jest.fn();
const mockLogin = jest.fn();

describe("Login Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  describe("when user is not authenticated", () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
      });
    });

    it("should render the login page correctly", () => {
      render(
        <TestAuthProvider>
          <Login />
        </TestAuthProvider>,
      );

      expect(screen.getByText("Login to Pedigree")).toBeInTheDocument();
      expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
      expect(
        screen.getByText(/By signing in, you agree to our/),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Privacy Policy" }),
      ).toBeInTheDocument();
    });

    it("should not redirect when not authenticated", () => {
      render(
        <TestAuthProvider>
          <Login />
        </TestAuthProvider>,
      );

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should call login when sign in button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <TestAuthProvider>
          <Login />
        </TestAuthProvider>,
      );

      const signInButton = screen.getByRole("button", {
        name: /sign in with google/i,
      });
      await user.click(signInButton);

      expect(mockLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe("when user is authenticated", () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: mockLogin,
      });
    });

    it("should redirect to home when authenticated", () => {
      render(
        <TestAuthProvider>
          <Login />
        </TestAuthProvider>,
      );

      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
    });
  });

  describe("when loading", () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        login: mockLogin,
      });
    });

    it("should display loading state", () => {
      render(
        <TestAuthProvider>
          <Login />
        </TestAuthProvider>,
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.queryByText("Login to Pedigree")).not.toBeInTheDocument();
    });

    it("should not redirect when loading", () => {
      render(
        <TestAuthProvider>
          <Login />
        </TestAuthProvider>,
      );

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe("navigation effect", () => {
    it("should not redirect when authenticated but still loading", () => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: true,
        isLoading: true,
        login: mockLogin,
      });

      render(
        <TestAuthProvider>
          <Login />
        </TestAuthProvider>,
      );

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should redirect when authenticated and not loading", async () => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: mockLogin,
      });

      render(
        <TestAuthProvider>
          <Login />
        </TestAuthProvider>,
      );

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
      });
    });
  });
});

describe("PrivacyAgreement", () => {
  it("should match snapshot", () => {
    const { container } = render(<PrivacyAgreement />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("SignButton", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <TestAuthProvider>
        <SignButton />
      </TestAuthProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
