const fs = require("fs");

const text = fs.readFileSync("input.txt", "utf-8");

let [stack, commands] = text.split("\r\n\r\n");

stack = stack.split("\r\n");

const stackAmount = Math.max(
    ...stack[stack.length-1]
        .split(/ +/)
        .slice(1, -1)
        .map(e => parseInt(e))
)

let stacks = [...new Array(stackAmount)].map(_ => []);

for (let i = stack.length-2; i >= 0; i--) {
    for (let x = 0; x < stack[i].length; x++) {
        if (/[A-Z]/.test(stack[i][x])) {
            stacks[parseInt(stack[stack.length-1][x])-1].push(stack[i][x]);
        }
    }
}

commands.split("\r\n").map(e => e.trim()).forEach(command => {
    let amount = parseInt(command.slice(command.indexOf("move ")+5, command.indexOf(" from")));
    let from = parseInt(command.slice(command.indexOf(" from ")+6, command.indexOf(" to"))) - 1;
    let to = parseInt(command.slice(command.indexOf("to ")+3)) - 1;
    stacks[to] = stacks[to].concat(stacks[from].splice(stacks[from].length-amount, amount));
});

console.log(stacks.map(e => e[e.length-1]).join(""));