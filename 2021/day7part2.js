const fs = require('fs');

function solve(nums) {
    let coords = [...Array(Math.max(...nums))].map(_=>0);
    nums.forEach(e => coords = coords.map((e2, i) => e2+(Math.abs(e-i)*(Math.abs(e-i)+1)/2)));
    return Math.min(...coords);
}

console.log(solve(fs.readFileSync("day7input.txt", "utf-8").split(",").map(e => parseInt(e))));