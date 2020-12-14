console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = (data) => {
  const myTime = +data[0];
  const buses = data[1]
    .split(",")
    .filter((bus) => bus !== "x")
    .map((b) => +b);
  return [myTime, buses];
};

const prepare2 = (data) => {
  const myTime = +data[0];
  const buses = data[1].split(",").map((b) => (b === "x" ? "x" : +b));
  return [myTime, buses];
};

inputdata = prepare2(splitLines(inputdata));

console.log(inputdata);

const task1 = (data) => {
  const [myTime, buses] = data;
  let bestTime = myTime;
  let bestBus = 0;
  buses.forEach((bus) => {
    let waitTime = bus - (myTime % bus);
    console.log(waitTime, bus);
    if (waitTime < bestTime) {
      bestTime = waitTime;
      bestBus = bus;
    }
  });
  return bestBus * bestTime;
};

const task2 = (data) => {
  const [myTime, buses] = data;
  let betterBuses = [];
  buses.forEach((bus, index) => {
    let helpIndex = index;
    while (helpIndex > bus) helpIndex -= bus;
    if (bus === "x") return;
    if (index === 0) return;
    betterBuses.push({
      number: bus,
      remainder: bus - helpIndex,
      waitingTime: helpIndex,
    });
  });
  console.log(betterBuses);
  const obj = betterBuses.reduce(
    (accumulator, currentBus) => {
      cycleLen = accumulator.number * currentBus.number;
      for (let i = accumulator.remainder; i < cycleLen; i += accumulator.number) {
        if (
          //i % accumulator.number === accumulator.remainder &&   
          i % currentBus.number === currentBus.remainder
        )
          return { number: cycleLen, remainder: i };
      }
    },
    {
      number: buses[0],
      remainder: 0,
    }
  );
  return obj.remainder;
};

let testdata = `5
17,x,13,19`;

testdata = prepare2(splitLines(testdata));

console.log("");

doEqualTest(task2(testdata), 3417);

console.log(task2(inputdata));
