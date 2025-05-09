import type { Page } from "@playwright/test";

export class LoginPage {
  // Selectors
  readonly heading = 'h1:has-text("Login to Pedigree")';
  readonly googleSignInButton = 'button:has-text("Sign in with Google")';
  readonly loadingIndicator = 'div:has-text("Loading...")';

  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto("http://localhost:3010/login");
  }

  async waitForPageLoad() {
    await this.page.waitForSelector(this.heading);
  }

  async isLoadingVisible() {
    return await this.page.isVisible(this.loadingIndicator);
  }

  async isHeadingVisible() {
    return await this.page.isVisible(this.heading);
  }

  async isGoogleSignInButtonVisible() {
    return await this.page.isVisible(this.googleSignInButton);
  }

  async clickGoogleSignIn() {
    await this.page.click(this.googleSignInButton);
  }

  async fillGoogleCredentials(email: string, password: string) {
    // Handle Google OAuth popup
    const popupPromise = this.page.waitForEvent("popup");
    await this.clickGoogleSignIn();
    const popup = await popupPromise;

    // Fill Google login form (selectors may need adjustment based on Google's current UI)
    await popup.waitForSelector('input[type="email"]');
    await popup.fill('input[type="email"]', email);
    await popup.click("#identifierNext");

    await popup.waitForSelector('input[type="password"]', { state: "visible" });
    await popup.fill('input[type="password"]', password);
    await popup.click("#passwordNext");

    // Wait for redirect back to the application
    await this.page.waitForNavigation();
  }
}
