class Fish {
    static fishArr = [];
    constructor(timer) {
        this.timer = timer;
    }
    decrement() {
        this.timer--;
        if (this.timer < 0) {
            this.timer = 6;
            Fish.fishArr.push(new Fish(8));
        }
    }
}

`3`.split(",").map(e => parseInt(e)).forEach(e => Fish.fishArr.push(new Fish(e)));
for (let i = 0; i <= 31; i++) {
    Fish.fishArr.forEach(fish => fish.decrement());
    console.log("completed day: " + i);
}

console.log(Fish.fishArr.length);
//console.log(2 ** Math.floor(21/7) );