const fs = require("fs");

const input = fs.readFileSync("day4input.txt", "utf-8");

const grid = input.split("\n").map(line => line.split(""));

function checkForXMAS(grid, i, j) {
  let s1 = grid[i-1][j-1] + grid[i][j] + grid[i+1][j+1];
  let s2 = grid[i+1][j-1] + grid[i][j] + grid[i-1][j+1];
  return (s1 === "MAS" || s1 === "SAM") && (s2 === "MAS" || s2 === "SAM");
}

let amount = 0;
for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    if (checkForXMAS(grid, i, j)) {
      amount++;
    }
  }
}

console.log(amount);