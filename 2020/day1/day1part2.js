const fs = require('fs');
function solve(s) {
    for (let i = 0; i < s.length; i++) {
        for (let x = i+1; x < s.length; x++) {
            for (let j = x+1; j < s.length; j++) {
                if (s[i] + s[x] + s[j] === 2020)
                    return s[i] * s[x] * s[j];
            }
        }
    }
    return -1;
}

console.log(solve(
    fs.readFileSync("day1input.txt", "utf-8").split("\n").map(e=>parseInt(e))
));