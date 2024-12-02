const fs = require("fs");

const input = fs.readFileSync("day1input.txt", "utf8");

const lines = input.split("\n");

const numbers = lines.map(line => line.replace(/ +/g, " ").split(" "));

let arr1 = [], arr2 = [];

for (let i = 0; i < numbers.length; i++) {
  arr1.push(parseInt(numbers[i][0]));
  arr2.push(parseInt(numbers[i][1]));
}

arr1 = arr1.sort((a, b) => a - b);
arr2 = arr2.sort((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < arr1.length; i++) {
  totalDistance += Math.abs(arr1[i] - arr2[i]);
}

console.log(totalDistance);