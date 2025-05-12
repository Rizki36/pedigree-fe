import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  readonly heading: Locator;
  readonly googleLoginButton: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator("h1");
    this.googleLoginButton = page.getByRole("button", {
      name: /Sign in with Google/i,
    });
    this.loadingIndicator = page.getByText("Loading...");
  }

  async goto() {
    await super.goto("/login");
  }

  async clickGoogleLoginButton() {
    await this.googleLoginButton.click();
  }

  async expectPageLoaded() {
    await expect(this.heading).toContainText("Login to Pedigree");
    await expect(this.googleLoginButton).toBeVisible();
  }

  async expectLoadingState() {
    await expect(this.loadingIndicator).toBeVisible();
  }

  async mockAuthenticatedUser(isAuthenticated: boolean) {
    await this.page.evaluate((auth) => {
      localStorage.setItem("isAuthenticated", auth.toString());
      // Add any other auth-related localStorage items as needed
    }, isAuthenticated);
  }

  async mockAuthenticatedUserAPI(isAuthenticated: boolean) {
    await this.page.route("**/v1/auth/me", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (isAuthenticated) {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({
            authenticated: true,
            user: {
              id: "test-user-id",
              email: "test@example.com",
              name: "Test User",
              profilePictureUrl: "https://example.com/profile.jpg",
            },
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ authenticated: false, user: null }),
        });
      }
    });
  }

  async setupGoogleRedirectMock() {
    // Instead of complex window.location mocking, we'll intercept navigation
    // and abort it to prevent the test from actually navigating away
    await this.page.route("**/v1/auth/google", (route) => {
      // Log the redirect
      console.log(
        "Intercepted redirect to Google auth:",
        route.request().url(),
      );
      // Abort the navigation to prevent actually leaving the page
      route.abort();
    });
  }

  async waitForGoogleRedirect() {
    // Wait for a navigation request to the Google auth URL
    return this.page.waitForRequest("**/v1/auth/google");
  }
}
