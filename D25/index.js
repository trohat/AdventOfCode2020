console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data.map(d => +d);

inputdata = prepare(splitLines(inputdata));

const task1 = (data) => {
    const getLoopSize = publicKey => {
        let loopSize = 0;
        let subjectNumber = 1;
        while (subjectNumber !== publicKey) {
            subjectNumber = ( subjectNumber * 7 ) % 20201227;
            loopSize++;
        }
        console.log("Loop size:", loopSize);
        return loopSize;
    }

    const iterate = (subjectNumber, times) => {
        let value = 1;
        for (let i = 0; i < times; i++) {
            value = ( value * subjectNumber ) % 20201227;
        }
        console.log("Final:", value);

        return value;
    }

    const [ card, door ] = data;
    const cardLoopSize = getLoopSize(card);
    const doorLoopSize = getLoopSize(door);

    iterate(card, doorLoopSize);
    return iterate(door, cardLoopSize);
};

let testdata = `5764801
17807724`;

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 14897079);

console.log("");

console.log("Task 1: " + task1(inputdata));