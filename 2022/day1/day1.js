const fs = require("fs");

const text = fs.readFileSync("input.txt", "utf-8");

console.log(
    
    text.split("\r\n\r\n")
    .map(elf => 
        elf.split("\r\n")
        .map(v => parseInt(v))
        .reduce((a,b) => a+b, 0)    
    )
    .sort((a,b) => b-a)
    .slice(0,3)
    .reduce((a,b) => a+b)
);

