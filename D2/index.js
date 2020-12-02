console.log("script working");

//let data = inData();

data = data.split(String.fromCharCode(10));

data = data.map(d => {
    const hyphen = d.indexOf("-");
    const colon = d.indexOf(":");
    const space = d.indexOf(" ");
    return {
        low: +d.slice(0, hyphen),
        high: +d.slice(hyphen+1, space),
        condition: d.slice(space+1, colon),
        pass: d.slice(colon+2)
    }
});

const result1 = data.reduce((accumulator, value) =>  {
    let count = value.pass.split(value.condition).length-1;
    if (count >= value.low && count <= value.high) return accumulator + 1;
    return accumulator;
},0);

const result2 = data.reduce((accumulator, value) =>  {
    let first = value.pass.charAt(value.low - 1);
    let second = value.pass.charAt(value.high - 1);
    return accumulator + (first === value.condition ^ second === value.condition);
},0);

console.log("Task 1: " + result1);
console.log("Task 2: " + result2);