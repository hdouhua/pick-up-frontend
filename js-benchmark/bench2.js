const suite = new Benchmark.Suite();

suite
  //   .add("gk1", async () => {
  //     const processed = await gk1([7, "member_code1", "platform1"]);
  //   })
  .add("gk2", async () => {
    let z = await gk2([8, "member_code2", "platform2"]);
  })
  .add("gk22", async () => {
    let z = await gk22([7, "member_code2", "platform2"]);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", (event) => {
    console.log("Fastest is " + this.filter("fastest").map("name"));

    console.log("Benchmark suite complete.");
  })
  .run({ async: true });
