console.log("AOC 2020 - Day 15: Rambunctious Recitation");

const splitLines = (data) => data.split(",");

const prepare = data => data.map(d => +d);

preparedinputdata = prepare(splitLines(inputdata));

console.log(inputdata);

const task1 = (numbers) => {
    while( numbers.length < 2020) {
        const beforeLastMove = [ ...numbers];
        const newNumber = beforeLastMove.pop();
        const lastIndex = beforeLastMove.lastIndexOf(newNumber)
        if (lastIndex === -1) numbers.push(0);
        else numbers.push(numbers.length - lastIndex - 1);
    }
    return numbers.pop();
};

const task2slower = (numbers) => {
    const spokenNumbers = new Map();
    let lastIndex = numbers.length - 1
    numbers.forEach((n, index) => {
        if (index !== lastIndex) spokenNumbers.set(n, index);
    });
    let lastNumber = numbers[lastIndex];
    let newNumber;
    while( numbers.length < 30000000) {
        if (!spokenNumbers.has(lastNumber)) newNumber = 0;
        else newNumber = (numbers.length - spokenNumbers.get(lastNumber) - 1);
        numbers.push(newNumber);
        spokenNumbers.set(lastNumber, lastIndex);
        lastIndex += 1;
        lastNumber = newNumber;
    }
    return numbers.pop();
};

const task2 = (numbers) => {
    const spokenNumbers = new Map();
    let lastIndex = numbers.length - 1
    numbers.forEach((n, index) => {
        if (index !== lastIndex) spokenNumbers.set(n, index);
    });
    let lastNumber = numbers[lastIndex];
    let newNumber;
    while( lastIndex + 1 < 30000000) {
        if (!spokenNumbers.has(lastNumber)) newNumber = 0;
        else newNumber = (lastIndex - spokenNumbers.get(lastNumber));
        spokenNumbers.set(lastNumber, lastIndex);
        lastIndex += 1;
        lastNumber = newNumber;
    }
    return lastNumber;
};

const tasktest = data => {
    while (data.length < 30000000) {
        data.push(1);
    }
    return data.pop();
}

let testdata = `0,3,6`;

console.log("");

preparedtestdata = prepare(splitLines(testdata));

doEqualTest(task1(preparedtestdata), 436);

console.log("Task 1: " + task1(preparedinputdata));

console.log("");

console.time();

preparedtestdata = prepare(splitLines(testdata));

preparedinputdata = prepare(splitLines(inputdata));

doEqualTest(task2(preparedtestdata), 175594);

console.log("Task 2: " + task2(preparedinputdata));

console.timeEnd();
