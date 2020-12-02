console.log("script working");

//let data = inData();

data = data.split(String.fromCharCode(10));

data = data.map(d => +d);

const sum = 2020;

let result1, result2;

data.forEach( d => {
    data.forEach( d2 => {
        if (data.includes(sum - d)) {
            result1 = d * (sum - d);
        }
    })
});

data.forEach( d => {
    data.forEach( d2 => {
        if (data.includes(sum - d - d2)) {
            result2 = d * d2 * (sum - d - d2);
        }
    })
});

console.log("Task 1: " + result1);
console.log("Task 2: " + result2);