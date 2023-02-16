// @ts-check
const { test, expect, chromium } = require("@playwright/test");

test.describe("launch browser", () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
      executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.addInitScript({
      path: "preload.js",
    });

    await page.goto("https://gywall.circesports.com/");
  });

  test("call API", async () => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/React App/);

    // create a locator
    const getStarted = page.locator("#SafeButton");

    // Click the button
    await getStarted.click();

    // Get the result
    const text = await page.locator("#resultDiv");

    // Expects the URL to contain intro.
    await expect(text).toHaveText(/.*Success.*/);
  });
});
