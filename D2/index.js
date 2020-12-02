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
        password: d.slice(colon+2)
    }
});

const result1 = data.reduce((accumulator, currentValue) =>  {
    let count = currentValue.password.split(currentValue.condition).length-1;
    if (count >= currentValue.low && count <= currentValue.high) return accumulator + 1;
    return accumulator;
},0);

const result2 = data.reduce((accumulator, currentValue) =>  {
    let firstChar = currentValue.password.charAt(currentValue.low - 1);
    let secondChar = currentValue.password.charAt(currentValue.high - 1);
    return accumulator + (firstChar === currentValue.condition ^ secondChar === currentValue.condition);
},0);

console.log("Task 1: " + result1);
console.log("Task 2: " + result2);