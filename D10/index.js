console.log("AOC 2020 - Day 10: Adapter Array");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => { 
    data = data.map( d => +d);
    data.sort((a,b) => a-b);
    return data;
};

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

const task1 = (data) => {
    let oneDiff = 1;
    let threeDiff = 1;
    for (let i = 1; i < data.length; i++) {
        if (data[i] - data[i-1] === 1) oneDiff++;
        if (data[i] - data[i-1] === 3) threeDiff++;
    }
    return oneDiff * threeDiff;
};

const task2 = data => {
    let firstNum = 0;
    let firstWays = 1;
    let secondNum = data[0];
    let secondWays = 1;
    let thirdNum = data[1];
    if (thirdNum === 4) thirdWays = 1; else thirdWays = 2;
    let actNum;
    let actWays
    for (let i = 2; i < data.length; i++) {
        actNum = data[i];
        actWays = thirdWays;
        if (actNum - secondNum <= 3) actWays = actWays + secondWays;
        if (actNum - firstNum <= 3) actWays = actWays + firstWays;
        [ firstNum, firstWays, secondNum, secondWays, thirdNum, thirdWays ] = [ secondNum, secondWays, thirdNum, thirdWays, actNum, actWays ];
    }
    return actWays;
}

let testdata1 = `16
10
15
5
1
11
7
19
6
12
4`;

let testdata2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));

console.log("");
console.log(testdata1);

doEqualTest(task1(testdata2), 220);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata1), 8);
doEqualTest(task2(testdata2), 19208);

console.log("Task 2: " + task2(inputdata));
