import { expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class AnimalPage extends BasePage {
  async goto() {
    await super.goto("/animals");
  }

  // Element getters
  get pageTitle() {
    return this.page.getByRole("heading", { name: "Animals" });
  }

  get searchInput() {
    return this.page.getByPlaceholder("Search");
  }

  get addAnimalButton() {
    return this.page.getByRole("button", { name: "Add Animal" });
  }

  get addAnimalDialog() {
    return this.page.getByRole("dialog").filter({ hasText: "Add Animal" });
  }

  get addAnimalForm() {
    return this.addAnimalDialog.locator("form");
  }

  get animalTypeSelect() {
    return this.addAnimalForm.getByLabel("Animal Type");
  }

  get genderSelect() {
    return this.addAnimalForm.getByLabel("Gender");
  }

  get codeInput() {
    return this.addAnimalForm.getByLabel("Code");
  }

  get nameInput() {
    return this.addAnimalForm.getByLabel("Name");
  }

  get submitButton() {
    return this.addAnimalForm.getByRole("button", { name: "Add Animal" });
  }

  // Actions
  async clickGenderFilter(gender: string) {
    await this.page.getByTestId(`cb-gender-${gender}`).click();
  }

  async clickStatusFilter(status: string) {
    await this.page.getByTestId(`cb-status-${status}`).click();
  }

  async searchForAnimal(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    // Wait for debounce
    await this.page.waitForTimeout(600);
  }

  async clickAddAnimalButton() {
    await this.addAnimalButton.click();
  }

  async fillAddAnimalForm(animalData: {
    animalTypeCode: string;
    code: string;
    name: string;
    gender: string;
  }) {
    // Select animal type
    await this.animalTypeSelect.click();
    await this.page
      .getByRole("option", { name: animalData.animalTypeCode, exact: true })
      .click();

    // Select gender
    await this.genderSelect.click();
    await this.page
      .getByRole("option", { name: animalData.gender, exact: true })
      .click();

    // Fill code and name
    await this.codeInput.fill(animalData.code);
    await this.nameInput.fill(animalData.name);
  }

  async submitAddAnimalForm() {
    await this.submitButton.click();
  }

  // Assertions
  async expectPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.addAnimalButton).toBeVisible();
  }

  async expectAddAnimalDialogVisible() {
    await expect(this.addAnimalDialog).toBeVisible();
  }
}
