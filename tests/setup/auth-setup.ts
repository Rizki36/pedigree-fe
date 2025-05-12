import { chromium, type FullConfig } from "@playwright/test";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

// Get the directory name using ES Module approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env files
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config(); // Also load from default .env file as fallback

// This will be executed once before all tests
async function globalSetup(config: FullConfig) {
  // Create a browser and context
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Get test email from environment variables
  const testEmail = process.env.VITE_TEST_EMAIL || "test@example.com";
  console.log(`Using test email: ${testEmail}`);

  const res = await page.request.post(
    "http://localhost:3011/v1/auth/test-login",
    {
      data: {
        email: testEmail,
      },
    },
  );
  console.log("Test login response:", res.status(), await res.json());

  // Reload page to apply the authentication
  await page.reload();

  // Verify we are logged in by waiting for redirect to dashboard
  //   await page.waitForURL("http://localhost:3010/");

  // Store the authentication state
  const authFile = path.join(__dirname, "../auth-state.json");
  await context.storageState({ path: authFile });
  console.log(`Authentication state saved to ${authFile}`);

  // Close browser
  await browser.close();
}

export default globalSetup;
