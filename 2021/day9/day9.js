const fs = require('fs');

function solve(input) {
    const grid = input.split("\r\n").map(e=>e.split("").map(e=>parseInt(e)));
    let sum = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let x = 0; x < grid[i].length; x++) {
            if (i > 0 && grid[i-1][x] <= grid[i][x])
                continue;
            else if (i < grid.length-1 && grid[i+1][x] <= grid[i][x])
                continue;
            else if (x > 0 && grid[i][x-1] <= grid[i][x])
                continue;
            else if (x < grid[i].length-1 && grid[i][x+1] <= grid[i][x])
                continue;

            sum += grid[i][x]+1;
            console.log(grid[i][x] +": "+i + " "+ x);
        }
    }
    return sum;
}

console.log(
    solve(fs.readFileSync("day9input.txt", "utf-8"))
)