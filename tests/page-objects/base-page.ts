import type { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async mockLocalStorage(key: string, value: string) {
    await this.page.evaluate(
      ({ k, v }) => {
        localStorage.setItem(k, v);
      },
      { k: key, v: value },
    );
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => {
      localStorage.clear();
    });
  }
}
