let indexes = [0,0,0,0,0,0,0,0,0];
`3,4,3,1,2`
.split(",").forEach(e=>indexes[parseInt(e)-1]++);

for (let i = 0; i < 255; i++) {
    let newfish = indexes[0];
    let newarray = indexes.slice(1);
    newarray.push(newfish);
    newarray[6] += newfish;
    indexes = newarray;
}

console.log(indexes.reduce((a,b)=>a+b));