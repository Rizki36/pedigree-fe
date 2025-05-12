import { test, expect } from "@playwright/test";
import { LoginPage } from "./page-objects/login-page";

// Explicitly mark these tests to run in the unauthenticated project
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("should display the login page correctly", async () => {
    await loginPage.expectPageLoaded();
  });

  test("should redirect to home when already authenticated", async ({
    page,
  }) => {
    // Set up API to return authenticated user
    await loginPage.mockAuthenticatedUserAPI(true);

    // Clear any existing data first to ensure clean state
    await page.evaluate(() => localStorage.clear());

    // Navigate to login page and expect redirect
    await loginPage.goto();

    // Check we get redirected to home page
    await expect(page).toHaveURL("/", { timeout: 5000 });
  });

  test("should show loading state", async () => {
    // Set up loading state mock
    await loginPage.mockAuthenticatedUserAPI(false);

    // Reload the page to trigger loading state
    await loginPage.goto();

    // Verify loading state is shown
    await loginPage.expectLoadingState();
  });

  test("should initiate Google login when button is clicked", async () => {
    // Set up route interception before navigating to the page
    await loginPage.setupGoogleRedirectMock();

    // Create a promise that will resolve when the redirect happens
    const redirectPromise = loginPage.waitForGoogleRedirect();

    // Click the Google login button
    await loginPage.clickGoogleLoginButton();

    // Wait for the redirect attempt and verify it happened
    const request = await redirectPromise;

    // Verify the request was made to the correct endpoint
    expect(request.url()).toContain("/v1/auth/google");
  });
});
