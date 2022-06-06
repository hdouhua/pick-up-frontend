const { test } = require("@playwright/test");

// test.beforeAll( async ({ page }) => {  });
// test.beforeEach( async ({ page }) => {});
// test.afterAll( async ({ page }) => {  });

test("Run benchmarks", async ({ page, baseURL }) => {
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

  await page.route('./bench.js', (route, _)=>{
    route.continue({url: `${baseURL}/demo/bench.js`});
  });

  // await page.goto(`file://${process.cwd()}/demo/index.html`);
  await page.goto(`${baseURL}/demo/index.html`);

  await benchmarkPromise;
});
