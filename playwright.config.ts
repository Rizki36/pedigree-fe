import { defineConfig, devices } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory name using ES Module approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: "./tests/setup/auth-setup.ts",
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3010",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        // Use stored authentication state with the correct path
        storageState: path.join(__dirname, "tests/auth-state.json"),
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        // Use stored authentication state with the correct path
        storageState: path.join(__dirname, "tests/auth-state.json"),
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        // Use stored authentication state with the correct path
        storageState: path.join(__dirname, "tests/auth-state.json"),
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"], // Use stored authentication state with the correct path
    //     storageState: path.join(__dirname, "tests/auth-state.json"),
    //   },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: {
    //     ...devices["iPhone 12"], // Use stored authentication state with the correct path
    //     storageState: path.join(__dirname, "tests/auth-state.json"),
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "yarn dev",
    port: 3010,
    reuseExistingServer: !process.env.CI,
  },
});
