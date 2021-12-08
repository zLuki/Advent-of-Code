let s = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`.split("\n");

class Point {
    static highestX = 0;
    static highestY = 0;
    constructor(x,y){
        this.x=x;
        this.y=y;
        if (x > Point.highestX)
            Point.highestX = x;
        if (y > Point.highestY)
            Point.highestY = y;
    }
}

const points = s.map(e => 
    [
        new Point(
            parseInt(e.slice(0,e.indexOf(","))), // x1
            parseInt(e.slice(e.indexOf(",")+1, e.indexOf(" "))), // y1
        ),
        new Point(
            parseInt(e.slice(e.lastIndexOf(" ")+1, e.lastIndexOf(","))),
            parseInt(e.slice(e.lastIndexOf(",")+1))
        )
    ]
);

const field = [...Array(Point.highestY+1)].map(_=>[...Array(Point.highestX+1)].map(_=>0));

points.forEach(group => {
    // Gleiche X Werte
    if (group[0].x === group[1].x) {
        for (let i = Math.min(group[0].y, group[1].y); i <= Math.max(group[0].y, group[1].y); i++) {
            field[i][group[0].x]++;
        }
    }
    // Gleiche Y Werte 
    else if (group[0].y === group[1].y) {
        for (let i = Math.min(group[0].x, group[1].x); i <= Math.max(group[0].x, group[1].x); i++) {
            field[group[0].y][i]++;
        }
    }
});
let sum = 0;
for (let i = 0; i < field.length; i++){
    for (let x = 0; x < field[i].length; x++) {
        if (field[i][x] > 1) sum++;
    }
}
console.log(sum);