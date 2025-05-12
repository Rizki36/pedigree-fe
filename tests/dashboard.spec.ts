import { test, expect } from "@playwright/test";
import { DashboardPage } from "./page-objects/dashboard-page";

// The test assumes we are already authenticated via storageState
test.describe("Dashboard Page", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("should display dashboard when authenticated", async () => {
    await dashboardPage.expectDashboardLoaded();
  });

  test("should display animal distribution chart", async () => {
    await dashboardPage.expectTreeStructureVisible();
  });

  test("should display action needed cards", async () => {
    await dashboardPage.expectActionCardsVisible();
  });

  test("should navigate to animals page when clicking tree nodes", async ({
    page,
  }) => {
    // Click on Male node and check URL
    await dashboardPage.clickMaleNode();
    await expect(page).toHaveURL(/\/animals\?gender=MALE/);

    // Go back to dashboard
    await dashboardPage.goto();

    // Test clicking on a child node (Male > Alive)
    await dashboardPage.clickMaleAliveNode();

    // Check navigation with multiple filters
    await expect(page).toHaveURL(/\/animals\?gender=MALE&status=ALIVE/);
  });
});
