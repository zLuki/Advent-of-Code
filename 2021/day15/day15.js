const fs = require('fs');

function solve(input) {
    let counter = 0;
    const nodes = input.split("\r\n")
                        .map(e => e.split("")
                        .map(e => {
                            return {
                                value: Infinity,
                                name: ++counter,
                                risk: parseInt(e),
                                visited: false,
                                connections: []
                            }
                        }));
    // Work on connections
    const allNodes = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let x = 0; x < nodes[i].length; x++) {
            if (i > 0) nodes[i][x].connections.push(nodes[i-1][x]/*.name*/);
            if (i < nodes.length-1) nodes[i][x].connections.push(nodes[i+1][x]/*.name*/);
            if (x > 0) nodes[i][x].connections.push(nodes[i][x-1]/*.name*/);
            if (x < nodes[i].length-1) nodes[i][x].connections.push(nodes[i][x+1]/*.name*/);
            allNodes.push(nodes[i][x]);
        }
    }
    
    // Dijkstra Algorithmus
    function findMinVal(nodes) {
        let node = null;
        for (let i = 0; i < nodes.length; i++) {
            if (!node && !nodes[i].visited) {
                node = nodes[i];
            }
            else if (!nodes[i].visited && nodes[i].value < node.value) {
                node = nodes[i];
            }
        }
        return node;
    }
    
    allNodes[0].value = 0;
    let currentNode;
    while (true) {
        currentNode = findMinVal(allNodes);
        if (!currentNode) break;
        currentNode.visited = true;
        for (let i = 0; i < currentNode.connections.length; i++) {
            let val = currentNode.value + currentNode.connections[i].risk;
            if (val < currentNode.connections[i].value) {
                currentNode.connections[i].value = val;
            }
        }
        //allNodes.forEach(e => console.log(e.name + " " + e.value))
        //console.log("-----------------------")
    }

    return allNodes[allNodes.length-1].value;
    
}

console.log(
    solve(fs.readFileSync("day15input.txt", "utf-8"))
);