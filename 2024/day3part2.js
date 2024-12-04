const fs = require("fs");

const input = fs.readFileSync("day3input.txt", "utf8");

const regex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;

const matches = input.match(regex);

let sum = 0;
let enabled = true;
for (let i = 0; i < matches.length; i++) {
  const match = matches[i];
  if (match === "do()") {
    enabled = true;
  }
  else if (match === "don't()") {
    enabled = false;
  }
  else if (enabled) {
    const numbers = match.match(/\d{1,3}/g);
    const a = Number(numbers[0]);
    const b = Number(numbers[1]);
    sum += a * b;
  }
}

console.log(sum);