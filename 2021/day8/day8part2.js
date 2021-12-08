const fs = require('fs');

function solve(input) {
    input = input.split("\n").map(e => e.split("|").map(e=>e.trim().split(" ")));
    let sum = 0;

    input.forEach(line => {
        const possible = [...Array(7)].map(_=>[]);
        let one = line[0].filter(e=>e.length===2)[0];
        let seven = line[0].filter(e=>e.length===3)[0];
        let four = line[0].filter(e=>e.length===4)[0];
        let eight = line[0].filter(e=>e.length===7)[0];

        // Do what we can with seven and one
        possible[0].push(seven.split("").filter(e=>!one.includes(e)).join(""));
        possible[2].push(one[0]);
        possible[2].push(one[1]);
        possible[5].push(one[0]);
        possible[5].push(one[1]);

        // Do what we can with four
        four.split("").filter(e=>!one.includes(e)).forEach(e => {
            possible[1].push(e);
            possible[3].push(e);
        });

        // Do what we can with eight
        eight.split("").filter(e=>!four.includes(e)&&!seven.includes(e)).forEach(e => {
            possible[4].push(e);
            possible[6].push(e);
        })
        
        // Filter out unpossible permutations
        const currentPermutations = permutations.filter(permutation => {
            for (let i = 0; i < 7; i++) {
                if (!possible[i].includes(permutation[i])) return false;
            }
            return true;
        });
        
        // Convert 10 input strings to digits for each possible permutation using the stringToDigit object
        
        function stringToDigit(string, permutation) {
            let sPermutaiton = permutation.join("");
            for (let x = 0; x < string.length; x++) {
                sPermutaiton = sPermutaiton.replace(new RegExp(string[x]), "1");
            }
            sPermutaiton = sPermutaiton.replace(/[\D]/g, "0");
            return stringToDigitMap[sPermutaiton];
        }
        
        let vaildPermutation = null;
        currentPermutations.forEach(permutation => {
            let combinations = line[0];
            let indexes = [...Array(10)].map(_=>0);
            for (let i = 0; i < combinations.length; i++) {
                let index = stringToDigit(combinations[i], permutation);
                if (index!==undefined)
                    indexes[index]++;
            }
            if (indexes.every(e => e===1)) {
                vaildPermutation = permutation;
                return;
            }
        });
        sum += parseInt(line[1].map(e => stringToDigit(e, vaildPermutation)).join(""));
    });
    return sum;
}

function *permute(a, n = a.length) {
    if (n <= 1) yield a.slice();
    else for (let i = 0; i < n; i++) {
        yield *permute(a, n - 1);
        const j = n % 2 ? 0 : i;
        [a[n-1], a[j]] = [a[j], a[n-1]];
    }
}
const permutations = Array.from(permute("abcdefg".split('')))
.map(perm => perm.join(''))
.filter((el, idx, self) => (self.indexOf(el) === idx))
.map(e => e.split(""));

const stringToDigitMap = {
    "1110111": 0,
    "0010010": 1,
    "1011101": 2,
    "1011011": 3,
    "0111010": 4,
    "1101011": 5,
    "1101111": 6,
    "1010010": 7,
    "1111111": 8,
    "1111011": 9
}

console.log(
    solve(fs.readFileSync("day8input.txt", "utf-8"))
);