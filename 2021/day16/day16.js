const fs = require('fs');

function interpretLiteral(bits) {
    let package = {
        version: parseInt(bits.slice(0,3), 2),
        typeID: parseInt(bits.slice(3,6), 2),
        value: null,
        neededBits: null
    }
    let s = "";
    for (let i = 6;; i+=5) {
        const num = bits.slice(i,i+5);
        s += num.slice(1);
        if (num[0] === "0") {
            package.neededBits = i+6;
            break;
        }
    }
    package.value = parseInt(s, 2);
    return package;
}

function findNextByLength() {

}

function findNextByAmount() {

}

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
        const lengthOrAmount = parseInt(bits.slice(7, sliceEnd), 2);
        console.log(lengthOrAmount);
        if (lengthTypeId === "0") {
            recFind(bits.slice(sliceEnd, sliceEnd+lengthOrAmount), sum);
        } else {

        }


    }
}

function solve(input) {
    input = "38006F45291200";
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

    //return sum;
    //console.log(interpretLiteral("D2FE28".split("").map(e => convert[e]).join("")));
}

console.log(
    solve(fs.readFileSync("day16input.txt", "utf-8"))
);