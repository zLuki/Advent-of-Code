const fs = require('fs');

function solve (input) {
    input = input.split("\r\n").map(e => e.split(""));
    let sum = 0;
    const val = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    }, convert = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    }
    input.forEach(line => {
        let seq = [];
        for (let i = 0; i < line.length; i++) {
            if ("<([{".includes(line[i])) {
                seq.push(line[i]);
            }
            else {
                let c = convert[seq.pop()];
                if (c !== line[i]) {
                    sum += val[line[i]];
                    break;
                }
            }
        }
    });
    return sum;
}

console.log(
    solve(fs.readFileSync("day10input.txt", "utf-8"))
);