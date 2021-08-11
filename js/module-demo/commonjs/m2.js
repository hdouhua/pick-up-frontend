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
  increaseCounter,
};
