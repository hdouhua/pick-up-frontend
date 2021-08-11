// module 1

var counter = 3;

function increaseCounter() {
  counter++;
}

module.exports = {
  /**
   * getter method
   */
  get counter() {
    return counter
  },
  set counter(val) {
    console.log('set invoked:', val)
    counter = val
  },
  increaseCounter,
};
