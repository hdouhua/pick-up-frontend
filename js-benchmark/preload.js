console.log("i am preload.js");
// disable webdriver
Object.defineProperty(navigator, "webdriver", {
  get: () => false
});
