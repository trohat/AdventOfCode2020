console.log("funguju");

const splitLines = (data) => data.split(",");

const prepare = data => data.map(d => +d);

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

const task1 = (numbers) => {
    while( numbers.length < 2020) {
        //const newNumber = numbers[numbers.length-1];
        const beforeLastMove = [ ...numbers];
        const newNumber = beforeLastMove.pop();
        const lastIndex = beforeLastMove.lastIndexOf(newNumber)
        if (lastIndex === -1) numbers.push(0);
        else numbers.push(numbers.length - lastIndex - 1);
    }
    console.log(numbers);
    return numbers.pop();
};

const task2 = data => {
 
}

let testdata = `0,3,6`;

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 436);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
