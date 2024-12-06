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

function mergeSort(array) {

  // base case
  if (array <= 1) {
    return array;
  }

  // standard case
  const number = array[0];
  const otherNumbers = array.slice(1);

  let before = [], after = [];
  for (let rule of rules) {
    let numberIndex = rule.indexOf(number);
    if (numberIndex >= 0) {
      for (let otherNumber of otherNumbers) {
        let otherNumberIndex = rule.indexOf(otherNumber);
        if (otherNumberIndex >= 0) {
          if (otherNumberIndex < numberIndex) {
            before.push(otherNumber);
          } else {
            after.push(otherNumber);
          }
        }
      }
    }
  }

  const beforeSorted = mergeSort(before);
  const afterSorted = mergeSort(after);

  return beforeSorted.concat([number]).concat(afterSorted);
  
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
  if (!valid) {
    const fixedUpdate = mergeSort(updates[i]);
    sum += findMiddleElement(fixedUpdate);
  }
}

console.log(sum);