const fs = require("fs");

//const input = fs.readFileSync("input.txt", "utf-8");
const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

// console.log(
//     input
//         .split('\n')
//         .map(e => replaceFirstNumber(e))
//         .map(e => replaceLastNumber(e))
//         .map(e => e.split("")
//             .filter(e => /\d+/.test(e))
//         )
//         .map(e => parseInt(e[0] +  e[e.length-1]))
//         //.reduce((a,b) => a+b)
// );

console.log(replaceLastNumber("abcone2threexyz"))

function replaceFirstNumber(line) {

    const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    let newString = "";

    let number = "";
    for (let i = 0; i < line.length; i++) {

        newString += line[i];
        number += line[i];

        //console.log(number);

        let found = false;
        for (let x = 0; x < numbers.length; x++) {
            if (numbers[x].startsWith(number)) {
                found = true;
                break;
            }
        }
        if (!found) {
            number = "";
        }

        for (let x = 0; x < numbers.length; x++) {
            if (numbers[x] == number) {
                newString = newString.slice(0, newString.length - number.length);
                newString += (x + 1);
                return newString + line.slice(i+1);
            }
        }

    }

    return newString;
}

function replaceLastNumber(line) {

    line = line.split("").reverse().join("");

    const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].map(e => e.split("").reverse().join(""));

    let newString = "";

    let number = "";
    for (let i = 0; i < line.length; i++) {

        newString += line[i];
        number += line[i];

        //console.log(number);

        let found = false;
        for (let x = 0; x < numbers.length; x++) {
            if (numbers[x].startsWith(number)) {
                found = true;
                break;
            }
        }
        if (!found) {
            console.log("drop: " + number);
            number = "";
        }

        for (let x = 0; x < numbers.length; x++) {
            if (numbers[x] == number) {
                newString = newString.slice(0, newString.length - number.length);
                newString += (x + 1);
                console.log("Hello: " + numbers[x]);
                return (newString + line.slice(i+1)).split("").reverse().join("");
            }
        }

    }

    return newString.split("").reverse().join("");
}
    