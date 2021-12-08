const fs = require('fs');

const solve = input => 
    input.split("\r\n").map(e=>[
        parseInt(e.slice(0,e.indexOf("-"))),
        parseInt(e.slice(e.indexOf("-")+1, e.indexOf(" "))),
        e.slice(e.lastIndexOf(" ")+1)
            .split("")
            .filter(c => c===e.slice(e.indexOf(" ")+1, e.indexOf(":")))
            .join("")
            .length
    ])
    .filter(e => e[2] >= e[0] && e[2] <= e[1])
    .length;

console.log(
    solve(fs.readFileSync("day2input.txt", "utf-8"))
);
