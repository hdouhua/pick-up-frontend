const { test } = require("@playwright/test");

test("Run benchmarks", async ({ page }) => {
  let benchmarkPromise = new Promise((resolve) => {
    page.on("console", async (message) => {
      if (message.text() === "Benchmark suite complete.") {
        resolve();
      } else {
        // pipe through any other console output
        console[message.type()](message);
      }
    });
  });

  await page.goto(`file://${process.cwd()}/demo2.html`);

  await benchmarkPromise;
});
