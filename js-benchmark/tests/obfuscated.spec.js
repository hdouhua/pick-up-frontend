const { test } = require("@playwright/test");

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
    route.continue({url: `${baseURL}/demo4/bench.js`});
  });

  await page.goto(`${baseURL}/demo4/index.html`);

  await benchmarkPromise;
});
