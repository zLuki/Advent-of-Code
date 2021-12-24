const fs = require('fs');

function recFind(bits, sum) {
    const version = parseInt(bits.slice(0,3), 2);
    const typId = parseInt(bits.slice(3,6), 2);
    sum[0] += version;
    if (typId !== 4) {
        const lengthTypeId = bits[6];
        let sliceEnd = 7;
        if (lengthTypeId === "1")
            sliceEnd += 11;
        else
            sliceEnd += 15;
        const length = parseInt(bits.slice(7, sliceEnd), 2);
        console.log(length);
        /*let start = [];
        
        for (let i = sliceEnd; i+length <= bits.length; i+=length) {
            start.push(bits.slice(i,i+length));
            //recFind(bits.slice(i,i+length), sum);
        }*/
    }
}

function solve(input) {
    const convert = {
        "0": "0000",
        "1": "0001",
        "2": "0010",
        "3": "0011",
        "4": "0100",
        "5": "0101",
        "6": "0110",
        "7": "0111",
        "8": "1000",
        "9": "1001",
        "A": "1010",
        "B": "1011",
        "C": "1100",
        "D": "1101",
        "E": "1110",
        "F": "1111"
    };
    const bits = input.split("").map(e => convert[e]).join("");
    const sum = [0];
    recFind(bits, sum)

    return sum;
}

console.log(
    solve(fs.readFileSync("day16input.txt", "utf-8"))
);