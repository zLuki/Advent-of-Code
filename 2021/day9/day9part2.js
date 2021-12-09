const fs = require('fs');

function changeGrid(grid, row, column, sum) {
    sum[0]++;
    grid[row][column] = -1;
    if (row > 0 && grid[row-1][column] > grid[row][column] && grid[row-1][column] !== 9)
        changeGrid(grid, row-1, column, sum);
    if (row < grid.length-1 && grid[row+1][column] > grid[row][column] && grid[row+1][column] !== 9)
        changeGrid(grid, row+1, column, sum);
    if (column > 0 && grid[row][column-1] > grid[row][column] && grid[row][column-1] !== 9)
        changeGrid(grid, row, column-1, sum);
    if (column < grid[row].length-1 && grid[row][column+1] > grid[row][column] && grid[row][column+1] !== 9)
        changeGrid(grid, row, column+1, sum);
}

function solve(input) {
    const grid = input.split("\r\n").map(e=>e.split("").map(e=>parseInt(e)));
    let lowpoints = [];
    for (let i = 0; i < grid.length; i++) {
        for (let x = 0; x < grid[i].length; x++) {
            if ((i > 0 && grid[i-1][x] <= grid[i][x]) ||  
            (i < grid.length-1 && grid[i+1][x] <= grid[i][x]) || 
            (x > 0 && grid[i][x-1] <= grid[i][x]) ||   
            (x < grid[i].length-1 && grid[i][x+1] <= grid[i][x]))
                continue;
            lowpoints.push({row:i,column:x});
        }
    }
    const sums = [];
    lowpoints.forEach(lowpoint => {
        if (grid[lowpoint.row][lowpoint.column] !== -1) {
            let sum = [0];
            changeGrid(grid, lowpoint.row, lowpoint.column, sum);
            sums.push(sum[0]);
        }
    });
    return sums.sort((a,b)=>b-a).slice(0,3).reduce((a,b)=>a*b);
}

console.log(
    solve(fs.readFileSync("day9input.txt", "utf-8"))
)