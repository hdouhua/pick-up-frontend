import { gk } from "../lib/obfuscated.js";
const suite = new Benchmark.Suite();

// if (typeof window !== "undefined")
//   console.log("webdriver:", window.navigator.webdriver);
suite
  .add("gk", async () => {
    const processed = await gk([7, "member_code", "platform"]);
    console.log(processed);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", (event) => {
    console.log("Fastest is " + suite.filter("fastest").map("name"));

    console.log("Benchmark suite complete.");
  })
  .run({ async: true });
