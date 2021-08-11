// module 1

var counter = 3;

function increaseCounter() {
  counter++;
}

module.exports = {
  /**
   * this is value copy.
   * once output a value any changes will not be effective on usage outside
   */
  counter,
  increaseCounter,
};
