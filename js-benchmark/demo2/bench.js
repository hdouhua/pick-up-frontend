import gk from "../lib/gen-key.js";
const suite = new Benchmark.Suite();

const { gk1, gk2, gk22 } = gk;

if (typeof window !== "undefined") {
  console.log("webdriver:", window.navigator.webdriver);
  window.global = {
    platform: 1,
  };
}

suite
  // .add("gk1", async () => {
  //   let z = await gk1([7, "member_code1", "platform1"]);
  // })
  // .add("gk2", async () => {
  //   let z = await gk2([8, "member_code2", "platform2"]);
  // })
  .add("gk22", async () => {
    let z = await gk22([7, "member_code2", "platform2"]);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", (event) => {
    console.log("Fastest is " + suite.filter("fastest").map("name"));

    console.log("Benchmark suite complete.");
  })
  .run({ async: true });
