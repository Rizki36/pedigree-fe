import { test, expect } from "@playwright/test";
import { AnimalPage } from "./page-objects/animal-page";

// The test assumes we are already authenticated via storageState
test.describe("Animals Page", () => {
  let animalPage: AnimalPage;

  test.beforeEach(async ({ page }) => {
    animalPage = new AnimalPage(page);
    await animalPage.goto();
  });

  test("should display animals page when authenticated", async () => {
    await animalPage.expectPageLoaded();
  });

  test("should filter animals by gender", async ({ page }) => {
    // Click on Male filter
    await animalPage.clickGenderFilter("MALE");
    await expect(page).toHaveURL(/\/animals\?gender=MALE/);

    // Click on Female filter
    await animalPage.clickGenderFilter("FEMALE");
    await expect(page).toHaveURL(/\/animals\?gender=FEMALE/);

    // Click on Other filter
    await animalPage.clickGenderFilter("OTHER");
    await expect(page).toHaveURL(/\/animals\?gender=OTHER/);
  });

  test("should filter animals by status", async ({ page }) => {
    await animalPage.clickStatusFilter("ALIVE");
    await expect(page).toHaveURL(/\/animals\?status=ALIVE/);
  });

  test("should search for animals", async ({ page }) => {
    const searchTerm = "Test Animal";
    await animalPage.searchForAnimal(searchTerm);
    await expect(page).toHaveURL(/\/animals\?search=Test%20Animal/);
  });

  test("should open add animal dialog", async () => {
    await animalPage.clickAddAnimalButton();
    await animalPage.expectAddAnimalDialogVisible();
  });

  test("should add a new animal", async ({ page }) => {
    const animalData = {
      animalTypeCode: "DOG",
      code: "TEST-123",
      name: "Test Animal",
      gender: "MALE",
    };

    await animalPage.clickAddAnimalButton();
    await animalPage.fillAddAnimalForm(animalData);
    await animalPage.submitAddAnimalForm();

    // After successful submission, we should be redirected to the animal detail page
    await expect(page).toHaveURL(/\/animals\/[a-zA-Z0-9-]+$/);
  });
});
