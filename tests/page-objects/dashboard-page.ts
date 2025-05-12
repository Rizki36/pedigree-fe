import { expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class DashboardPage extends BasePage {
  async goto() {
    await super.goto("/");
    await this.animalDistributionTitle.waitFor();
  }

  // Element getters
  get animalDistributionTitle() {
    return this.page.getByText("Animal Distribution");
  }

  get actionNeededTitle() {
    return this.page.getByText("Action Needed");
  }

  get totalAnimalNode() {
    return this.page.getByText("Total Animal").first();
  }

  get maleNode() {
    return this.page.getByText("Male").first();
  }

  get maleAliveNode() {
    return this.page.getByTestId("Total Animal-Male-Alive").first();
  }

  get femaleNode() {
    return this.page.getByText("Female").first();
  }

  get otherNode() {
    return this.page.getByText("Other").first();
  }

  get genderCard() {
    return this.page.getByText("Need to add gender");
  }

  get dobCard() {
    return this.page.getByText("Need to add date of birth");
  }

  get fatherCard() {
    return this.page.getByText("Need to add father");
  }

  get motherCard() {
    return this.page.getByText("Need to add mother");
  }

  // Actions
  async clickMaleNode() {
    await this.maleNode.click();
  }

  async clickMaleAliveNode() {
    await this.maleAliveNode.click();
  }

  async clickFemaleNode() {
    await this.femaleNode.click();
  }

  async clickChildNode(parentLabel: string, childLabel: string) {
    // First click parent to expand
    await this.page.getByText(parentLabel).first().click();
    // Then click child
    await this.page.getByText(childLabel).click();
  }

  // Assertions
  async expectDashboardLoaded() {
    await expect(this.animalDistributionTitle).toBeVisible();
    await expect(this.actionNeededTitle).toBeVisible();
  }

  async expectTreeStructureVisible() {
    await expect(this.totalAnimalNode).toBeVisible();
    await expect(this.maleNode).toBeVisible();
    await expect(this.femaleNode).toBeVisible();
    await expect(this.otherNode).toBeVisible();
  }

  async expectActionCardsVisible() {
    await expect(this.genderCard).toBeVisible();
    await expect(this.dobCard).toBeVisible();
    await expect(this.fatherCard).toBeVisible();
    await expect(this.motherCard).toBeVisible();
  }
}
