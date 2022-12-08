
const fs = require("fs");
const { exit } = require("process");

const text = fs.readFileSync("input.txt", "utf-8");

for (let i = 0; i < text.length-13; i++) {
    let already = [], found = true;
    for (let x = i; x < i+14; x++) {
        if (already.includes(text[x])) {
            found = false;
            break;
        } else {
            already.push(text[x]);
        }
    }
    if (found) {
        console.log(i+14);
        exit(0);
    }
}