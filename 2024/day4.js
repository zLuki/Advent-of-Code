const fs = require("fs");

const input = fs.readFileSync("day4input.txt", "utf-8");

const grid = input.split("\n").map(line => line.split(""));
const XMAS = "XMAS";

function searchLeft(grid, i, j) {
  for (let x = 0; x < XMAS.length; x++) {
    if (grid[i].length <= j+x || grid[i][j+x] !== XMAS[x]) {
      return false;
    }
  }
  return true;
}

function searchRight(grid, i, j) {
  for (let x = 0; x < XMAS.length; x++) {
    if (j-x < 0 || grid[i][j-x] !== XMAS[x]) {
      return false;
    }
  }
  return true;
}

function searchDown(grid, i, j) {
  for (let x = 0; x < XMAS.length; x++) {
    if (grid.length <= i+x || grid[i+x][j] !== XMAS[x]) {
      return false;
    }
  }
  return true;
}

function searchUp(grid, i, j) {
  for (let x = 0; x < XMAS.length; x++) {
    if (i-x < 0 || grid[i-x][j] != XMAS[x]) {
      return false;
    }
  }
  return true;
}

function searchRightDown(grid, i, j) {
  for (let x = 0; x < XMAS.length; x++) {
    if (grid.length <= i+x || grid[i].length <= j+x || grid[i+x][j+x] !== XMAS[x]) {
      return false;
    }
  }
  return true;
}

function searchLeftDown(grid, i, j) {
  for (let x = 0; x < XMAS.length; x++) {
    if (grid.length <= i+x || j-x < 0 || grid[i+x][j-x] !== XMAS[x]) {
      return false;
    }
  }
  return true;
}

function searchLeftUp(grid, i, j) {
  for (let x = 0; x < XMAS.length; x++) {
    if (i-x < 0 || j-x < 0 || grid[i-x][j-x] !== XMAS[x]) {
      return false;
    }
  }
  return true;
}

function searchRightUp(grid, i, j) {
  for (let x = 0; x < XMAS.length; x++) {
    if (i-x < 0 || grid[i].length <= j+x || grid[i-x][j+x] !== XMAS[x]) {
      return false;
    }
  }
  return true;
}

const functions = [searchLeft, searchRight, searchDown, searchUp, searchRightDown, searchLeftDown, searchLeftUp, searchRightUp];

let amount = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    for (let f of functions) {
      if (f(grid, i, j)) {
        amount++;
      }
    }
  }
}

console.log(amount);