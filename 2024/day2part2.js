function isIncreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
};

function isDecreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      return false;
    }
  }
  return true;
}

function hasCorrectDifference(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = Math.abs(arr[i] - arr[i + 1]);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return true;
}

function isReportSafe(arr) {
  return (isIncreasing(arr) || isDecreasing(arr)) && hasCorrectDifference(arr);
}

function copyArrayWithoutIndex(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

const fs = require("fs");

const input = fs.readFileSync("day2input.txt", "utf8");

const lines = input.split("\n");

const field = lines.map(line => line.split(" ").map(Number));


let amount = 0;
for (let i = 0; i < field.length; i++) {
  // try without removing any element
  if (isReportSafe(field[i])) {
    amount++;
    continue;
  }
  // try removing a element
  for (let j = 0; j < field[i].length; j++) {
    const newArr = copyArrayWithoutIndex(field[i], j);
    if (isReportSafe(newArr)) {
      amount++;
      break;
    }
  }
}

console.log(amount);