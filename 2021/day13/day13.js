const fs = require('fs');

function mergeInto(arr, toAdd) {
    for (let i = 0; i < toAdd.length; i++) {
        if (toAdd[i] === "#") arr[i] = "#";
    }
}

function getPoints(board) {
    let sum = 0;
    for (let i = 0; i < board.length; i++) {
        for (let x = 0; x < board[i].length; x++) {
            if (board[i][x] === "#") sum++;
        }
    }
    return sum;
}

function solve(input) {
    input = input.split("\r\n\r\n");
    const points = input[0].split("\r\n").map(e => e.split(",").map(e => parseInt(e)));
    const commands = input[1].split("\r\n");
    
    let board = [...Array(Math.max(...points.map(e=>e[1]))+1)]
                    .map(e => [...Array(Math.max(...points.map(e=>e[0]))+1)]
                    .map(e => "."));
    points.forEach(e => board[e[1]][e[0]] = "#");
    for (let j = 0; j < commands.length; j++) {
        const axis = commands[j].slice(commands[j].lastIndexOf(" ")+1, commands[j].indexOf("="));
        const num = parseInt(commands[j].slice(commands[j].indexOf("=")+1));
        if (axis === "y") {
            let firstPart = board.slice(0, num);
            let secondPart = board.slice(num+1);
            for (let i = 0; i < secondPart.length; i++) {
                mergeInto(firstPart[firstPart.length-i-1], secondPart[i]);
            }
            board = firstPart;
        } else if (axis === "x") {
            let firstPart = [], secondPart = [];
            for (let i = 0; i < board.length; i++) firstPart.push(board[i].slice(0, num));
            for (let i = 0; i < board.length; i++) secondPart.push(board[i].slice(num+1));
            for (let i = 0; i < secondPart.length; i++) mergeInto(firstPart[i], secondPart[i].reverse());
            board = firstPart;
        }
        // ONLY FOR FIRST PART
        //break;
    }
    // Print 8 letters code
    board.forEach(e => console.log(e.join("")))
    return getPoints(board);
}
console.log(
    solve(fs.readFileSync("day13input.txt", "utf-8"))
);