const fs = require("fs");

const input = fs.readFileSync("day1input.txt", "utf8");

const lines = input.split("\n");

const numbers = lines.map(line => line.replace(/ +/g, " ").split(" "));

let arr1 = [], arr2 = [];

for (let i = 0; i < numbers.length; i++) {
  arr1.push(parseInt(numbers[i][0]));
  arr2.push(parseInt(numbers[i][1]));
}


let totalSum = 0;

for (let i = 0; i < arr1.length; i++) {
  let amount = 0;
  for (let j = 0; j < arr2.length; j++) {
    if (arr1[i] === arr2[j]) {
      amount++;
    }
  }
  totalSum += arr1[i] * amount;
}

console.log(totalSum);