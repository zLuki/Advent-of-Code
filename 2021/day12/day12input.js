const fs = require('fs');

function hasAlreadyTwoSmallCaves(arr) {
    let cnt = {};
    for (let i = 0; i < arr.length; i++) {
        if (cnt[arr[i]]) return true;
        cnt[arr[i]] = true;
    }
    return false;
}

function recSearch(point, coords, smallVisited, sum, currentPath, allPaths) {
    currentPath.push(point);
    if (point === "end") {
        allPaths.push(currentPath)
        sum[0]++;
        return;
    }
    if (point === "start") return;
    if (point === point.toLowerCase()) {
        if (hasAlreadyTwoSmallCaves(smallVisited) && smallVisited.includes(point)) return;
        smallVisited.push(point);
    }
    if (coords[point]) {
        for (let i = 0; i < coords[point].length; i++) {
            if (coords[point][i] !== point)
                recSearch(coords[point][i], coords, smallVisited.slice(), sum, currentPath.slice(), allPaths);
        }
    }
}

function solve(input) {
    const coords = {};
    input.split("\r\n").forEach(e => {
        let conn = e.split("-");
        if (coords[conn[0]]) coords[conn[0]].push(conn[1]);
        else coords[conn[0]] = [conn[1]];
        if (coords[conn[1]]) coords[conn[1]].push(conn[0]);
        else coords[conn[1]] = [conn[0]];
    });
    let sum = [0];
    let allPaths = [];
    coords.start.forEach(e => {
        let smallVisited = ["start"];
        let currentPath = ["start"]
        recSearch(e, coords, smallVisited.slice(), sum, currentPath.slice(), allPaths)
    });
    return sum;
}

console.log(
    solve(fs.readFileSync("day12input.txt", "utf-8"))
);