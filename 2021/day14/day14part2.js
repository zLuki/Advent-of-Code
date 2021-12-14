const fs = require('fs');

function solve(input) {
    let poly = input.split("\r\n\r\n")[0];
    let groups = {}; 
    input.split("\r\n\r\n")[1].split("\r\n").map(e => e.split(" -> ")).forEach(e => groups[e[0]] = e[1]);
    
    let polyObj = {};
    for (let i = 0; i < poly.length-1; i++) {
        if (polyObj[poly[i]+poly[i+1]]) polyObj[poly[i]+poly[i+1]]++;
        else polyObj[poly[i]+poly[i+1]] = 1;
    }
    /*Object.keys(polyObj).forEach(key => {
        let group = key[1]+groups[key];
        if (polyObj[group]) polyObj += polyObj[key];
        else polyObj[group] = polyObj[key];
    });*/
    for (let j = 0; j < 40; j++) {
        const keys = Object.keys(polyObj);
        let newpolyObj = {};
        for (let i = 0; i < keys.length; i++) {
            // First step
            let group = keys[i][0] + groups[keys[i]];
            if (newpolyObj[group]) newpolyObj[group] += polyObj[keys[i]];
            else newpolyObj[group] = polyObj[keys[i]];
            // Second step
            group = groups[keys[i]] + keys[i][1];
            if (newpolyObj[group]) newpolyObj[group] += polyObj[keys[i]];
            else newpolyObj[group] = polyObj[keys[i]];
        }
        polyObj = newpolyObj;
    }
    console.log(polyObj);
    console.log("--------------");
    let count = {}, count2 = {};
    Object.keys(polyObj).forEach(key => {
        if (count[key[0]]) count[key[0]] += polyObj[key];
        else count[key[0]] = polyObj[key];

        if (count2[key[1]]) count2[key[1]] += polyObj[key];
        else count2[key[1]] = polyObj[key];
    });
    let finalCount = {};
    Object.keys(count).forEach(key => {
        finalCount[key] = Math.max(count[key], count2[key]);
    })
    console.log(finalCount);
    const sorted = Object.values(finalCount).sort((a,b) => b-a);
    return sorted[0] - sorted[sorted.length-1];
}

console.log(
    solve(fs.readFileSync("day14input.txt", "utf-8"))
)