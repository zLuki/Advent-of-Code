const fs = require("fs");
const { exit } = require("process");

const input = fs.readFileSync("input.txt", "utf-8");

let positionsOfTail = [[0,0]];
let positionsOfHead = [[0,0]];

input.split("\r\n").map(e => e.split(" ")).forEach(e => {
    const row = e[0] === "U" ? 1 : e[0] === "D" ? -1 : 0;
    const column = e[0] === "L" ? -1 : e[0] === "R" ? 1 : 0;
    for (let i = 0; i < parseInt(e[1]); i++) {
        const lastPositionOfHead = positionsOfHead[positionsOfHead.length-1];
        const currentPosition = [lastPositionOfHead[0]+row, lastPositionOfHead[1]+column];
        positionsOfHead.push(currentPosition);
        const lastPositionOfTail = positionsOfTail[positionsOfTail.length-1];
        const dist = Math.sqrt(Math.pow(currentPosition[0]-lastPositionOfTail[0], 2) + Math.pow(currentPosition[1]-lastPositionOfTail[1], 2));
        
        if (dist >= 1.5) {
            if (currentPosition[0] > lastPositionOfTail[0]) {
                if (currentPosition[1] < lastPositionOfTail[1]) {
                    positionsOfTail.push([lastPositionOfTail[0]+1, lastPositionOfTail[1]-1]);
                } 
                else if (currentPosition[1] === lastPositionOfTail[1]) {
                    positionsOfTail.push([lastPositionOfTail[0]+1, lastPositionOfTail[1]]);
                }
                else {
                    positionsOfTail.push([lastPositionOfTail[0]+1, lastPositionOfTail[1]+1]);
                }
            }
            else if (currentPosition[0] < lastPositionOfTail[0]) {
                if (currentPosition[1] < lastPositionOfTail[1]) {
                    positionsOfTail.push([lastPositionOfTail[0]-1, lastPositionOfTail[1]-1]);
                } 
                else if (currentPosition[1] === lastPositionOfTail[1]) {
                    positionsOfTail.push([lastPositionOfTail[0]-1, lastPositionOfTail[1]]);
                }
                else {
                    positionsOfTail.push([lastPositionOfTail[0]-1, lastPositionOfTail[1]+1]);
                }
            }
            else {
                if (currentPosition[1] < lastPositionOfTail[1]) {
                    positionsOfTail.push([lastPositionOfTail[0], lastPositionOfTail[1]-1]);
                }
                else {
                    positionsOfTail.push([lastPositionOfTail[0], lastPositionOfTail[1]+1]);
                }
            }
        }
        // console.log(currentPosition);
        // console.log(positionsOfTail[positionsOfTail.length-1]);
        // console.log("--------------------");
        //exit(0);
    }    
});
let obj = {};
positionsOfTail.forEach(e => obj[e.join(",")] = true);
console.log(Object.keys(obj).length);
