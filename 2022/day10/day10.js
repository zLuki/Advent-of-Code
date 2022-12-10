const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");

let measures = [[0,1]];
let singalStrength = 1, cycle = 0;

input.split("\r\n").forEach(line => {
    if (line === "noop") {
        cycle++;
    } else {
        cycle += 2;
        singalStrength += parseInt(line.slice(line.indexOf(" ")+1));
        measures.push([cycle, singalStrength]);
    }
});


let s = "";
let counter = 0;
for (let i = 0; i < 240; i++) {
    counter++;
    if (i%40 === 0) {
        counter = 0;
        s += "\n";
    }
    for (let x = 1; x < measures.length; x++) {
        if (measures[x][0] > i) {
            //console.log("Position of X: " + measures[x-1][1]);
            //console.log(i + " " + counter);
            if (Math.abs(measures[x-1][1] - (counter)) < 2) s += "#";
            else s += ".";
            break;
        }
    }
    //console.log(s);
    //if (i % 40 === 0)
    //    s += "\n";
}

console.log(s);