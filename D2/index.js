console.log("AOC 2020 - Day 2: Password Philosophy");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\d+)-(\d+) ([a-z]): ([a-z]+)/
    return data.map(d => {
        const [ , low, high, condition, password ] = re.exec(d);
        return {
            low, high, condition, password
        }
    });
};

inputdata = prepare(splitLines(inputdata));

const task1 = data => data.reduce((accumulator, currentValue) =>  {
    let count = currentValue.password.split(currentValue.condition).length-1;
    if (count >= currentValue.low && count <= currentValue.high) return accumulator + 1;
    return accumulator;
},0);

const task2 = data => data.reduce((accumulator, currentValue) =>  {
    let firstChar = currentValue.password.charAt(currentValue.low - 1);
    let secondChar = currentValue.password.charAt(currentValue.high - 1);
    return accumulator + (firstChar === currentValue.condition ^ secondChar === currentValue.condition);
},0);

const testdata = prepare(splitLines(`1-3 a: abcde
                                     1-3 b: cdefg
                                     2-9 c: ccccccccc`));

doEqualTest(task1(testdata), 2);

doEqualTest(task2(testdata), 1);

console.log("Task 1: " + task1(inputdata));
console.log("Task 2: " + task2(inputdata));