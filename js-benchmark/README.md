# JS benchmark

benchmark toolkits in JS

- Benchmark.js
- Playwright

online toolkits

- https://jsperf.com/ (it is crashed now)
- https://perf.link/

## Benchmark.js

> please refer to https://benchmarkjs.com/

- run with node.js

>please uncomment the lines below
>```
>// // for nodejs version
>// const Benchmark = require("benchmark");
>```

```shell
(base) ➜  js-benchmark git:(main) ✗ node demo/bench.js
Array.prototype.some x 80.69 ops/sec ±0.97% (70 runs sampled)
for loop x 1,969 ops/sec ±0.92% (89 runs sampled)
The fastest option is for loop
Benchmark suite complete.
```

- run with browser

open the HTML files and watch the result from console.

## Playwright

> please refer to https://playwright.dev/docs/intro

integrate Benchmark.js with Playwright.

- for all browsers

```shell
npx playwright test tests/bentch.spec.js --browser all
```

- for chromium

```shell
npx playwright test tests/bentch.spec.js --browser chromium --headed
```

```
(base) ➜  js-benchmark git:(main) ✗ npx playwright test tests/bench.spec.js --browser chromium

Running 1 test using 1 worker

  ✓  [chromium] › tests/bench.spec.js:3:1 › Run benchmarks (12s)
Array.prototype.some x 120 ops/sec ±0.52% (58 runs sampled)
for loop x 1,386 ops/sec ±1.28% (64 runs sampled)
The fastest option is for loop


  1 passed (12s)
```

- for firefox

```
(base) ➜  js-benchmark git:(main) ✗ npx playwright test tests/bench.spec.js --browser firefox

Running 1 test using 1 worker

  ✓  [firefox] › tests/bench.spec.js:3:1 › Run benchmarks (14s)
Array.prototype.some x 186 ops/sec ±0.56% (61 runs sampled)
for loop x 172 ops/sec ±0.52% (60 runs sampled)
The fastest option is Array.prototype.some


  1 passed (15s)
```

- for webkit

```
(base) ➜  js-benchmark git:(main) ✗ npx playwright test tests/bench.spec.js --browser webkit

Running 1 test using 1 worker

  ✓  [webkit] › tests/bench.spec.js:3:1 › Run benchmarks (12s)
Array.prototype.some x 334 ops/sec ±17.01% (36 runs sampled)
for loop x 1,005 ops/sec ±2.11% (61 runs sampled)
The fastest option is for loop


  1 passed (12s)
```