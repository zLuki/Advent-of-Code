const fs = require('fs');

const solve=i=>i.split("\n")
                .map(e=>e.split("|")[1]
                        .trim()
                        .split(" ")
                        .filter(e=>[2,3,4,7].includes(e.length)))
                .map(e=>e.length)
                .reduce((a,b)=>a+b);

console.log(
    solve(fs.readFileSync("day8input.txt", "utf-8"))
);

