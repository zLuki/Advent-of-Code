console.log(
    require("fs").readFileSync("input.txt", "utf-8")
    .split("\r\n")
    .map(e => [e.slice(0, e.length/2), e.slice(e.length/2)])
    .map(e => 
        Array.from(new Set(e[0].split``.map(c => e[1].includes(c) ? c : "").filter(e => e.length > 0)))[0]
    )
    .map(e => e === e.toLowerCase() ? e.charCodeAt(0) - 96 : e.charCodeAt(0) - 38)
    .reduce((a,b) => a+b, 0)
);