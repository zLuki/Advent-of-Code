const fs = require("fs");

const input = fs.readFileSync("day5input.txt", "utf-8");

let [rules, updates] = input.split("\r\n\r\n");

rules = rules.split("\r\n").map(rule => rule.split("|").map(Number));
updates = updates.split("\r\n").map(update => update.split(",").map(Number));


function findMiddleElement(arr) {
  if (arr.length === 0) {
    return null;
  }
  return arr[Math.floor(arr.length / 2)];
}

function validRule(update, rule) {
  let index1 = update.indexOf(rule[0]);
  if (index1 < 0) return true;
  let index2 = update.indexOf(rule[1]);
  if (index2 < 0) return true;
  return index1 < index2;
}

let sum = 0;
for (let i = 0; i < updates.length; i++) {
  let valid = true;
  for (let j = 0; j < rules.length; j++) {
    if (!validRule(updates[i], rules[j])) {
      valid = false;
      break;
    }
  }
  if (valid) {
    sum += findMiddleElement(updates[i]);
  }
}

console.log(sum);