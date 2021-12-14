const fs = require('fs');

function solve(input) {
    let poly = input.split("\r\n\r\n")[0];
    let groups = {}; 
    input.split("\r\n\r\n")[1].split("\r\n").map(e => e.split(" -> ")).forEach(e => groups[e[0]] = e[1]);
    for (let j = 0; j < 10; j++) {
        let newpoly = [];
        for (let i = 0; i < poly.length-1; i++) {
            newpoly.push(poly[i], groups[poly[i]+poly[i+1]]);
        }
        newpoly.push(poly.slice(-1));
        poly = newpoly.join("");
    }
    console.log(poly);
    let counts = {};
    for (let i = 0; i < poly.length; i++) {
        if (counts[poly[i]]) counts[poly[i]]++;
        else counts[poly[i]] = 1;
    }
    counts = Object.values(counts).sort((a,b)=>a-b);
    return counts.slice(-1) - counts[0];
}

console.log(
    solve(fs.readFileSync("day14input.txt", "utf-8"))
)