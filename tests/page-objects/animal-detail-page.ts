import { expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class AnimalDetailPage extends BasePage {
  async goto(animalId: string) {
    await super.goto(`/animals/${animalId}`);
  }

  // Element getters
  get pageTitle() {
    return this.page.getByRole("heading", { name: "Details" });
  }

  get editButton() {
    return this.page.getByTestId("edit-button");
  }

  get deleteButton() {
    return this.page.getByRole("button", { name: "Delete" });
  }

  get nameInput() {
    return this.detailsSection.getByLabel("Name");
  }

  get codeInput() {
    return this.detailsSection.getByLabel("Code");
  }

  get genderSelect() {
    return this.detailsSection.getByLabel("Gender");
  }

  get dobCalendarButton() {
    return this.detailsSection.getByLabel("Date of Birth");
  }

  get diedAtCalendarButton() {
    return this.detailsSection.getByLabel("Died At");
  }

  get saveButton() {
    return this.detailsSection.getByRole("button", { name: "Save" });
  }

  get cancelButton() {
    return this.detailsSection.getByRole("button", { name: "Cancel" });
  }

  get deleteConfirmButton() {
    return this.page.getByRole("button", { name: "Continue" });
  }

  get deleteCancelButton() {
    return this.page.getByRole("button", { name: "Cancel" });
  }

  get detailsSection() {
    return this.page.locator("section").filter({ hasText: "Details" }).first();
  }

  get calendarPopover() {
    return this.page.locator('[data-radix-popper-content-wrapper=""]');
  }

  // Actions
  async clickEditButton() {
    await this.editButton.click();
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async confirmDelete() {
    await this.deleteConfirmButton.click();
  }

  async cancelDelete() {
    await this.deleteCancelButton.click();
  }

  async selectDateOfBirth(day: number, month: string, year: number) {
    await this.dobCalendarButton.click();

    await this.calendarPopover.waitFor({ state: "visible" });

    // Select the day
    await this.page
      .getByRole("gridcell", { name: String(day) })
      .locator("button")
      .click();

    await this.calendarPopover.waitFor({ state: "hidden" });
  }

  async selectDiedAt(day: number, month: string, year: number) {
    await this.diedAtCalendarButton.click();

    await this.calendarPopover.waitFor({ state: "visible" });

    // Select the day
    await this.page
      .getByRole("gridcell", { name: String(day) })
      .locator("button")
      .click();

    await this.calendarPopover.waitFor({ state: "hidden" });
  }

  async editAnimalDetails(animalData: {
    name?: string;
    code?: string;
    gender?: string;
    dateOfBirth?: { day: number; month: string; year: number };
    diedAt?: { day: number; month: string; year: number };
  }) {
    await this.clickEditButton();

    if (animalData.name) {
      await this.nameInput.fill(animalData.name);
    }

    if (animalData.code) {
      await this.codeInput.fill(animalData.code);
    }

    if (animalData.gender) {
      await this.genderSelect.click();
      await this.page
        .getByRole("option", { name: animalData.gender, exact: true })
        .click();
    }

    if (animalData.dateOfBirth) {
      await this.selectDateOfBirth(
        animalData.dateOfBirth.day,
        animalData.dateOfBirth.month,
        animalData.dateOfBirth.year,
      );
    }

    if (animalData.diedAt) {
      await this.selectDiedAt(
        animalData.diedAt.day,
        animalData.diedAt.month,
        animalData.diedAt.year,
      );
    }

    await this.saveButton.click();
  }

  // Assertions
  async expectPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.editButton).toBeVisible();
    await expect(this.deleteButton).toBeVisible();
  }

  async expectEditFormVisible() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.codeInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }

  async expectDeleteDialogVisible() {
    await expect(this.deleteConfirmButton).toBeVisible();
    await expect(this.deleteCancelButton).toBeVisible();
  }

  async expectAnimalDetails(expected: {
    name?: string;
    code?: string;
    dateOfBirth?: string;
    diedAt?: string;
  }) {
    if (expected.name) {
      await expect(this.detailsSection).toContainText(expected.name);
    }

    if (expected.code) {
      await expect(this.detailsSection).toContainText(expected.code);
    }

    if (expected.dateOfBirth) {
      await expect(this.detailsSection).toContainText(expected.dateOfBirth);
    }

    if (expected.diedAt) {
      await expect(this.detailsSection).toContainText(expected.diedAt);
    }
  }

  async expectAnimalDataLoaded(expectedName: string, expectedCode: string) {
    // Wait for specific animal data to be visible in the details section
    await expect(this.detailsSection).toContainText(expectedName, {
      timeout: 5000,
    });
    await expect(this.detailsSection).toContainText(expectedCode, {
      timeout: 5000,
    });
  }
}
