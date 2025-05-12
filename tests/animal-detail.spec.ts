import { test, expect } from "@playwright/test";
import { AnimalPage } from "./page-objects/animal-page";
import { AnimalDetailPage } from "./page-objects/animal-detail-page";

// The test assumes we are already authenticated via storageState
test.describe("Animal Detail Page", () => {
  let animalPage: AnimalPage;
  let animalDetailPage: AnimalDetailPage;
  let createdAnimalId: string;
  let animalName: string;
  let animalCode: string;

  // Create a test animal before running the tests
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    animalPage = new AnimalPage(page);
    await animalPage.goto();

    // Create a test animal with timestamp to ensure uniqueness
    const timestamp = Date.now();
    animalName = `E2E Test Animal ${timestamp}`;
    animalCode = `TEST-${timestamp}`;

    const testAnimalData = {
      animalTypeCode: "DOG",
      code: animalCode,
      name: animalName,
      gender: "MALE",
    };

    await animalPage.clickAddAnimalButton();
    await animalPage.fillAddAnimalForm(testAnimalData);
    await animalPage.submitAddAnimalForm();

    // wait for the page to navigate to the animal detail page
    await page.waitForURL(/\/animals\/[a-zA-Z0-9-]+$/);

    // Extract the animal ID from the URL
    const url = page.url();
    createdAnimalId = url.split("/").pop() || "";

    await context.close();
  });

  test.beforeEach(async ({ page }) => {
    animalDetailPage = new AnimalDetailPage(page);
    await animalDetailPage.goto(createdAnimalId);

    // Wait for animal data to be fully loaded
    await animalDetailPage.expectAnimalDataLoaded(animalName, animalCode);
  });

  test("should display animal detail page", async () => {
    await animalDetailPage.expectPageLoaded();
  });

  test("should edit animal details", async () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" });
    const year = today.getFullYear();

    // Format the date for verification (e.g., "15 May 2025")
    const formattedDate = `${day} ${month} ${year}`;

    const updatedData = {
      name: `Updated E2E Animal ${Date.now()}`,
      code: `TEST-UPD-${Date.now()}`,
      gender: "FEMALE",
    };

    // Use the editAnimalDetails helper method instead of individual steps
    await animalDetailPage.editAnimalDetails({
      name: updatedData.name,
      code: updatedData.code,
      gender: updatedData.gender,
      dateOfBirth: { day, month, year },
      diedAt: { day, month, year },
    });

    // Wait for the update to complete and verify updates appear in the detail view
    await animalDetailPage.expectAnimalDetails({
      name: updatedData.name,
      code: updatedData.code,
      dateOfBirth: formattedDate,
      diedAt: formattedDate,
    });
  });

  test("should delete animal", async ({ page }) => {
    await animalDetailPage.clickDeleteButton();
    await animalDetailPage.expectDeleteDialogVisible();

    await animalDetailPage.confirmDelete();

    // After deletion, we should be redirected to the animals list page
    await expect(page).toHaveURL(/\/animals$/);

    // Verify we can't navigate back to the deleted animal
    await animalDetailPage.goto(createdAnimalId);
    // We should see some kind of error or empty state
    await expect(animalDetailPage.pageTitle).not.toBeVisible({ timeout: 3000 });
  });
});
