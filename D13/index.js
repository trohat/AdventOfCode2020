console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const myTime = +data[0];
    const buses = data[1].split(",").filter(bus => bus !== "x").map( b => +b);
    return [ myTime, buses ];
}

const prepare2 = data => {
    const myTime = +data[0];
    const buses = data[1].split(",").map( b => b === "x" ? "x" : +b);
    return [ myTime, buses ];
}

inputdata = prepare2(splitLines(inputdata));

console.log(inputdata);

const task1 = (data) => {
    const [ myTime, buses ] = data;
    let bestTime = myTime;
    let bestBus = 0;
    buses.forEach(bus => {
        let waitTime = bus - (myTime % bus);
        console.log(waitTime, bus);
        if (waitTime < bestTime) {
            bestTime = waitTime;
            bestBus = bus;
        }
    })
    return bestBus * bestTime;
};

const task2 = data => {
    const [ myTime, buses ] = data;
    mainLoop: for (let i = 0; i < Number.MAX_SAFE_INTEGER; i += buses[0]) {
        for (let j = 0; j < buses.length; j++) {
            if (buses[j] === "x") continue;
            if ((i + j) % buses[j] !== 0 ) continue mainLoop;
        }
        return i;
    }
 
}

let testdata = `5
7,13,x,x,59,x,31,19`;

testdata = prepare2(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), 295);

//console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 754018);

console.log("Task 2: " + task2(inputdata));
