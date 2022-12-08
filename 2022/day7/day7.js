const fs = require("fs");

const text = fs.readFileSync("input.txt", "utf-8");

function getRecSize(dirs, dir, size) {
    let files = dirs[dir];
    for (let i = 0; i < files.length; i++) {
        if (files[i].startsWith("dir")) {
            getRecSize(dirs, (dir + "/" + files[i].slice(4)).replace("//","/"), size)
        } else {
            size[0] += parseInt(files[i].slice(0, files[i].indexOf(" ")));
        }
    }
}


const commands = text.split("\r\n");

const dirs = {};
let currentPath = [];

commands.forEach((command, i) => {
    
    if (command === "$ cd ..") {
        currentPath.pop();
    }
    else if (command.startsWith("$ cd ")) {
        currentPath.push(command.slice("$ cd ".length));
    }
    else if (command === "$ ls") {
        let arr = [];
        for (let x = i+1; x < commands.length && commands[x][0] !== "$"; x++) {
            arr.push(commands[x]);
        }
        dirs[currentPath.join("/").slice(1) || "/"] = arr.slice();
    }

});

let bSize = [0];
getRecSize(dirs, "/", bSize);
let toomuch = (30000000 - (70000000 - bSize[0]));

console.log(
    Math.min(...
        Object.keys(dirs).map(e => {
            let size = [0];
            getRecSize(dirs, e, size);
            return size[0] > toomuch ? size[0] : Infinity;
        })
    )
);