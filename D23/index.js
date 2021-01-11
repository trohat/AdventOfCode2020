console.log("AOC 2020 - Day 23: Crab Cups");

const prepare = data => data.split("").map(d => +d);

const task = (cupsArray, cupsCount, repetitions, task) => {
    const printCups = current => {
        let first = current;
        let str = current.toString();
        while (cups[current] !== first) {
            current = cups[current];
            str += "," + current;
        }
        return str;
    }

    const cups = {};
    for (let i = 0; i < cupsArray.length-1; i++) {
        cups[cupsArray[i]] = cupsArray[i+1];
    }
    
    if (cupsCount > cupsArray.length) cups[cupsArray[cupsArray.length - 1]] = cupsArray.length + 1;

    for (let i = 10; i < cupsCount; i++) cups[i] = i+1;
    
    if (cupsCount <= cupsArray.length) cups[cupsArray[cupsArray.length - 1]] = cupsArray[0];
    else cups[cupsCount] = cupsArray[0];
    
    let currentCup = cupsArray[0];
    
    printCups(currentCup);
    
    for (let i = 0; i < repetitions; i++) {
        let firstOfThree = cups[currentCup];
        let secondOfThree = cups[firstOfThree];
        let thirdOfThree = cups[secondOfThree];
        let three = [ firstOfThree, secondOfThree, thirdOfThree ];
        cups[currentCup] = cups[thirdOfThree];
        
        let destination = currentCup - 1;
        while (three.includes(destination) || destination === 0) {
            if (three.includes(destination)) destination--;
            if (destination === 0) destination = cupsCount;
        }
        
        cups[thirdOfThree] = cups[destination];
        cups[destination] = firstOfThree;

        currentCup = cups[currentCup];
        //if (i % 1000000 === 0) console.log(i + " iteration steps");
    }
    
    if (task === 1) return printCups(1).split(",").slice(1).join("");
    
    return cups[1] * cups[cups[1]];
    
};

let testdata = `389125467`;

testdata = prepare(testdata);

inputdata = prepare(inputdata);

doEqualTest(task(testdata, 9, 100, 1), "67384529");

console.log("Task 1: " + task(inputdata, 9, 100, 1));

console.log("");

doEqualTest(task(testdata, 1000000, 10000000), 149245887792);

console.time();
console.log("Task 2: " + task(inputdata, 1000000, 10000000));
console.timeEnd();
