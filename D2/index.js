console.log("script working");

//let data = inData();

data = data.split(String.fromCharCode(10));

const re = /(\d+)-(\d+) ([a-z]): ([a-z]+)/

data = data.map(d => {
    const [ , low, high, condition, password ] = re.exec(d);
    return {
        low, high, condition, password
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