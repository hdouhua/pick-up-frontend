const { test } = require("@playwright/test");

test("Run benchmarks", async ({ page, baseURL }) => {
  let benchmarkPromise = new Promise((resolve) => {
    page.on("console", async (message) => {
      if (message.text() === "Benchmark suite complete.") {
        resolve();
      } else {
        console[message.type()](message);
      }
    });
  });

  await page.route("./bench.js", (route, _) => {
    route.continue({ url: `${baseURL}/demo3/bench.js` });
  });

  await page.goto(`${baseURL}/demo3/index.html`);

  await benchmarkPromise;
});
