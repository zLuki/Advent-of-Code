const fs = require('fs');

const solve = input => 
    input.split("\r\n")
    .map(e=>[
        parseInt(e.slice(0,e.indexOf("-"))),
        parseInt(e.slice(e.indexOf("-")+1,e.indexOf(" "))),
        e.slice(e.indexOf(" ")+1,e.indexOf(":")),
        e.slice(e.lastIndexOf(" ")+1)
    ])
    .filter(e => (e[3][e[0]-1]===e[2]&&e[3][e[1]-1]!==e[2]) ||
                  e[3][e[1]-1]===e[2]&&e[3][e[0]-1]!==e[2])
    .length;

console.log(
    solve(fs.readFileSync("day2input.txt", "utf-8"))
);
