const fs = require("fs");

const text = fs.readFileSync("input.txt", "utf-8");

const shapes = {
    "X": 1,
    "Y": 2,
    "Z": 3 
}

const enemyShapes = {
    "A": 1,
    "B": 2,
    "C": 3
}

// a rock 1
// b paper 2 
// c scissor 3

// x loose
// y draw
// z win

console.log(
    text.split("\r\n")
    .map(e => e.split(" "))
    .map(e => {
        let score = 0;
        if (e[1] === "X") {
            if (e[0] === "A") score += 3;
            else if (e[0] === "B") score += 1
            else score += 2; 
        } else if (e[1] === "Y") {
            score += 3;
            score += enemyShapes[e[0]];
        } else {
            score += 6;
            if (e[0] === "A") score += 2;
            else if (e[0] === "B") score += 3
            else score += 1;
        }
        return score;
    })
    .map((e,i,s) => s.slice(0,i+1).reduce((a,b) => a+b))
    //.reduce((a,b) => a+b)
);
