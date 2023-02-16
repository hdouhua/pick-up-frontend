// @ts-check
const { test, expect, chromium } = require("@playwright/test");

test.describe("launch browser", () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.addInitScript({
      path: "preload.js",
    });

    // await page.goto("https://fingerprint.com/products/bot-detection/");
    await page.goto("https://bot.sannysoft.com/");
  });

  test("detection result", async () => {
    await page.waitForTimeout(100000);
    // const detector = page.waitForSelector(
    //   ".HeroSection-module--detected--BrfX8"
    // );
    // console.log(detector.textContent);
    // expect(detector.textContent).toEqual("Not detected");
  });
});
