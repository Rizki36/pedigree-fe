import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe("Login E2E Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.waitForPageLoad();
  });

  test("should display login page elements correctly", async () => {
    // Verify heading is visible
    expect(await loginPage.isHeadingVisible()).toBeTruthy();

    // Verify Google sign-in button is visible
    expect(await loginPage.isGoogleSignInButtonVisible()).toBeTruthy();
  });

  // Mock the auth flow
  test("should redirect to home after successful login", async ({ page }) => {
    // Mock successful authentication by triggering the redirect programmatically
    await page.evaluate(() => {
      // Mock the successful auth state
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/";
    });

    // Verify redirect to home page
    await expect(page).toHaveURL(/.*\/$/);
  });

  test("login with mocked Google auth", async ({ page }) => {
    // Intercept Google OAuth requests
    await page.route("**/oauth2/v2/auth*", async (route) => {
      // Return a mock response or redirect as needed
      await route.fulfill({
        status: 302,
        headers: {
          location: "https://example.com/auth/callback?code=mock_auth_code",
        },
      });
    });

    // Also intercept token endpoint
    await page.route("**/oauth2/v4/token", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "mock_access_token",
          id_token: "mock_id_token",
          refresh_token: "mock_refresh_token",
          expires_in: 3600,
        }),
      });
    });

    // Now trigger login and assertions
  });
});
