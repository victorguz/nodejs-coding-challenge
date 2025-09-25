const assert = require("assert");
const multiply = 2;
// Implement a function that takes an object and multiply
// it's value by a constant and returns a promise
function calculateItem(item) {
  return new Promise((resolve) => {
    if (!isNaN(item.value)) {
      return resolve(Math.abs(item.value) * multiply);
    }
    return resolve(0);
  });
}

// Implement a function that returns true for "settled" items
function isSettled(item) {
  return item.settled;
}

async function main() {
  // Load data from a json file located at the "resources" folder
  const data = require("../resources/data.json");

  // For each item in the array that is "settled"
  // Multiply its absolute value by 2
  // Sum up results
  const promises = data
    .filter((item) => isSettled(item))
    .map((settledItem) => calculateItem(settledItem));
  const result = await Promise.all(promises);
  console.log(result);

  const calculatedValue = result.reduce((acc, value) => acc + value, 0);
  console.log("calculated value:", calculatedValue);
  
  // The final answer should be 42
  assert(calculatedValue === 42, "Incorrect value");
}

main();
