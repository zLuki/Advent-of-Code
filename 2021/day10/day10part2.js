const fs = require('fs');

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
    input.forEach((line, index) => {
        let seq = [];
        let broken = false;
        for (let i = 0; i < line.length; i++) {
            if ("<([{".includes(line[i])) {
                seq.push(line[i]);
            }
            else {
                let c = convert[seq.pop()];
                if (c !== line[i]) {
                    broken = true;
                    break;
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
            }
            scores.push(score);
        } 
    });
    console.log(scores.sort((a,b)=>(a-b)));
    return scores.sort((a,b)=>a-b)[Math.floor(scores.length/2)];
}

console.log(
    solve(fs.readFileSync("day10input.txt", "utf-8"))
);