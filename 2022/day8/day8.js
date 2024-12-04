const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").split("\r\n").map(e => e.split("").map(e => parseInt(e)));


let bestAllamount = 0;
for (let i = 0; i < input.length; i++) {
    for (let x = 0; x < input[i].length; x++) {
        
        let allAmount = 1;

        // look up
        let amount = 0;
        for (let j = i-1; j >= 0; j--) {
            amount++;
            if (input[j][x] >= input[i][x]) {
                break;
            }
        }
        allAmount *= amount;

        // look down
        amount = 0;
        for (let j = i+1; j < input.length; j++) {
            amount++;
            if (input[j][x] >= input[i][x]) {
                break;
            }
        }
        allAmount *= amount;

        // look left
        amount = 0;
        for (let j = x-1; j >= 0; j--) {
            amount++;
            if (input[i][j] >= input[i][x]) {
                break;
            }
        }
        allAmount *= amount;

        // look right
        amount = 0;
        for (let j = x+1; j < input[i].length; j++) {
            amount++;
            if (input[i][j] >= input[i][x]) {
                break;
            }
        }
        allAmount *= amount;

        if (allAmount > bestAllamount) {
            bestAllamount = allAmount;
            console.log(bestAllamount);
        }

        

    }
}

console.log(bestAllamount);