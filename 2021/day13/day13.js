const fs = require('fs');

function solve(input) {
    input = input.split("\r\n\r\n");
    const points = input[0].split("\r\n").map(e => e.split(",").map(e => parseInt(e)));
    const commands = input[1].split("\r\n");
    
    const board = [...Array(Math.max(...points.map(e=>e[1]))+1)]
                    .map(e => [...Array(Math.max(...points.map(e=>e[0]))+1)]
                    .map(e => "."));
    points.forEach(e => board[e[1]][e[0]] = "#");
    
    board.forEach(e => console.log(e.join("")))


}
console.log(
    solve(fs.readFileSync("day13input.txt", "utf-8"))
);