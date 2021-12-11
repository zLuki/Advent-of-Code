const fs = require('fs');
const { exit } = require('process');

function recFlash(grid, row, column) {
    for (let i = row-1; i <= row+1; i++) {
        for (let x = column-1; x <= column+1; x++) {
            if (i >= 0 && x >= 0 && i < grid.length && x < grid[0].length && grid[i][x] !== "f") {
                grid[i][x]++;
                if (grid[i][x] > 9) {
                    grid[i][x] = 'f';
                    recFlash(grid, i, x);
                }
            }
        }
    }
}


function solve(input) {
    input = input.split("\r\n").map(e=>e.split("").map(e=>parseInt(e)));
    for (let i = 0; ; i++) {
        let flash = [];
        for (let row = 0; row < input.length; row++) {
            for (let column = 0; column < input[row].length; column++) {
                input[row][column]++;
                if (input[row][column] > 9) {
                    flash.push({row: row, column: column});
                    input[row][column] = 'f';
                }
            }
        }
        for (let j = 0; j < flash.length; j++) {
            recFlash(input, flash[j].row, flash[j].column);
        }
        let syncFlash = true;
        for (let row = 0; row < input.length; row++) {
            for (let column = 0; column < input[row].length; column++) {
                if (input[row][column] === "f") {
                    input[row][column] = 0;
                } else {
                    syncFlash = false;
                }
            }
        }
        if (syncFlash)
            return i+1;
    }
}

console.log(
    solve(fs.readFileSync("day11input.txt", "utf-8"))
);