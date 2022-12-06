
const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

console.log(
    input
    .match(/(.+\s){2}.+\s?/gm)
    .map(e => e.split("\n"))
    .map(e => e[0].split``
        .filter(c => 
            e[1].includes(c) && e[2].includes(c)
        )
    )
    .map(e => e[0] === e[0].toLowerCase() ? e[0].charCodeAt(0) - 96 : e[0].charCodeAt(0) - 38)
    .reduce((a,b) => a+b)
);