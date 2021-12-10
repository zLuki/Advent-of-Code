const fs = require('fs');
const { exit } = require('process');
const { createCanvas } = require('canvas');

let counter = 0;
function makePic(matrix) {
    //console.log(matrix);
    //exit();
    const canvas = createCanvas(3200, 1100);
    const ctx = canvas.getContext("2d");
    ctx.font = "100px Arial";
    for (let i = 0; i < matrix.length; i++) {
        for (let x = 0; x < matrix[i].length; x++) {
            ctx.fillStyle = matrix[i][x].color;
            ctx.fillText(matrix[i][x].value, x*100, (i+1)*100);
        }
    }
    fs.writeFileSync("./"+(++counter)+".png", canvas.toBuffer("image/png"));
}

function solve (input) {
    input = input.split("\r\n").map(e => e.split(""));
    let scores = [];
    const val = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    }, convert = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    }
    const headMatrix = input.map(e => e.map(e => {return {value: e, color: "black"}}));
    input.forEach((line, index) => {
        let seq = [];
        let broken = false;
        for (let i = 0; i < line.length; i++) {
            if ("<([{".includes(line[i])) {
                seq.push(line[i]);
                let matrix = headMatrix.map(e=>e.map(e => {return {value: e.value, color: e.color}}));
                matrix[index][i].color = "green";
                makePic(matrix);
            }
            else {
                let c = convert[seq.pop()];
                if (c !== line[i]) {
                    broken = true;
                    for (let x = 0; x < line.length; x++)
                        headMatrix[index][x].color = "red";
                        makePic(headMatrix);
                    break;
                } else {
                    let matrix = headMatrix.map(e=>e.map(e => {return {value: e.value, color: e.color}}));
                    matrix[index][i].color = "green";
                    makePic(matrix);
                }
            }
        }
        if (!broken && seq.length > 0) {
            let score = 0;
            let seqStr = "";
            while (seq.length > 0) {
                score *= 5;
                let r = seq.pop();
                score += val[convert[r]];
                seqStr += convert[r];
                headMatrix[index].push({value: convert[r], color: "orange"});
                makePic(headMatrix);
            }
            scores.push(score);
        } else if (!broken) {
            for (let i = 0; i < line.length; i++) {
                headMatrix[index][i].color = "green";
                makePic(headMatrix);
            }
        } 
    });
    console.log(scores.sort((a,b)=>(a-b)));
    return scores.sort((a,b)=>a-b)[Math.floor(scores.length/2)];
}

console.log(
    solve(fs.readFileSync("day10input.txt", "utf-8"))
);

/*let test = [...Array(10)].map(e => [...Array(32)].map(e => {return {value: "(", color: "black"}}));
test[5][5].color = "green";
test[4][31].value = ")";
makePic(test);*/