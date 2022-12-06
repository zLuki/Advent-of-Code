const fs = require('fs');

function solve(input) {
    const grid = input.split("\r\n").map(e => e.split(""));
    let changed = true, j;
    for (j = 0; changed && j < 2; j++) {
        changed = false;
        let east = [], south = [];
        for (let i = 0; i < grid.length; i++) {
            for (let x = 0; x < grid[i].length; x++) {
                if (grid[i][x] === ">") east.push([i,x]);
                else if (grid[i][x] === "v") south.push([i,x]);
            }
        }
        east.forEach(point => {
            const pos = (point[1]+1)%grid[0].length
            if (grid[point[0]][pos] === ".") {
                grid[point[0]][point[1]] = ".";
                grid[point[0]][pos] = ">";
                changed = true;
            }
        });
        south.forEach(point => {
            const pos = (point[0]+1)%grid.length;
            if (grid[pos][point[1]] === ".") {
                grid[point[0]][point[1]] = ".";
                grid[pos][point[1]] = "v";
                changed = true;
            }
        });
        //break;
    }
    console.log(grid.map(e => e.join("")).join("\n"));
    return j;
}
console.log(
    solve(fs.readFileSync("day25input.txt", "utf-8"))
);