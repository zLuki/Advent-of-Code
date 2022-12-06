console.log(
    require("fs")
    .readFileSync("input.txt", "utf-8")
    .split("\r\n")
    .map(e => e.split(","))
    .map(e => e[0].split("-").concat(e[1].split("-")))
    .map(e => e.map(e => parseInt(e)))
    .filter(e =>(e[0] >= e[2] && e[0] <= e[3]) || (e[1] >= e[2] && e[1] <= e[3]) || 
                (e[2] >= e[0] && e[2] <= e[1]) || (e[3] >= e[0] && e[3] <= e[1])
    )
    .length
);