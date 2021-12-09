const fs = require('fs');
const { exit } = require('process');
const { createCanvas } = require('canvas')

let x = 0;
let heights = [...Array(9)].map(e => []);
const styles = {
    "-10": "rgb(255,232,190)",
    "-11": "rgb(255,199,90)",
    "-12": "rgb(255,181,72)",
    "-13": "rgb(255,166,0)",
    "-14": "rgb(254,141,0)",
    "-15": "rgb(255,0,0)",
    "-16": "rgb(220,0,0)",
    "-17": "rgb(166,0,0)",
    "-18": "rgb(132,0,0)",
    "-19": "rgb(100,0,0)"
}
/*const styles = {
    "-10": "red",
    "-11": "red",
    "-12": "red",
    "-13": "red",
    "-14": "red",
    "-15": "red",
    "-16": "red",
    "-17": "red",
    "-18": "red",
    "-19": "red"
}*/

function changeGrid(grid, row, column, sum) {
    ++x;
    sum[0]++;
    heights[grid[row][column]].push({row:row, column:column});
    grid[row][column] = -1;

    let tempGrid = grid.map(e=>e.slice());
    heights.forEach((e,i)=> e.forEach(e => tempGrid[e.row][e.column] = -i-10));
    const img = createCanvas(1000,1000);
    const ctx = img.getContext("2d");
    for (let i = 0; i < tempGrid.length; i++) {
        for (let x = 0; x < tempGrid[i].length; x++) {
            ctx.beginPath();
            ctx.rect(i*10, x*10, 10, 10);
            ctx.fillStyle = "gray";
            if (tempGrid[i][x] < -5) {
                ctx.fillStyle = styles[""+tempGrid[i][x]];
            }
            ctx.fill();
        }
    }
    fs.writeFileSync("./"+x+".png", img.toBuffer("image/png"));

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
    console.log(grid.length);
    console.log(grid[0].length);
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
console.log(x);


/*const img = createCanvas(1000, 1000)
const ctx = img.getContext("2d");
for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.rect(i*10, 40, 10, 10);
    ctx.fillStyle = "red";
    ctx.fill();
}

fs.writeFileSync("./out.png", img.toBuffer("image/png"))*/