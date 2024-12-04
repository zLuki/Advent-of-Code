const fs = require("fs");
const { exit } = require("process");

let input = fs.readFileSync("input.txt", "utf-8");

input = input.split("\r\n\r\n")
    .map(e => e.split("\r\n"))
    .map(e => ({
        items: e[1].slice(18).split(",").map(e => parseInt(e)),
        op: e[2].slice(19),
        mod: parseInt(e[3].slice(e[3].lastIndexOf(" ")+1)),
        t: parseInt(e[4].slice(e[4].lastIndexOf(" ")+1)),
        f: parseInt(e[5].slice(e[5].lastIndexOf(" ")+1)),
        visited: 0
    }));


const kgv = input.map(e => e.mod).reduce((a,b) => a*b);
console.log(kgv); 

for (let j = 0; j < 10000; j++) {
    for (let i = 0; i < input.length; i++) {
        while (input[i].items.length > 0) {
            input[i].visited++;
            let current = input[i].items.shift();
            //let newVal = Math.floor(eval(input[i].op.replace(/old/g, current)) / 3);
            let newVal = eval(input[i].op.replace(/old/g, current));
            newVal = newVal % kgv;
            if (newVal % input[i].mod === 0) {
                input[input[i].t].items.push(newVal);
            } else {
                input[input[i].f].items.push(newVal);
            }
        }
    }
}

console.log(input.map(e => e.visited));

input = input.map(e => e.visited).sort((a,b) => b-a);

console.log(input[0] * input[1]);