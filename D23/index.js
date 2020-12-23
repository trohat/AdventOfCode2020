console.log("funguju");

const prepare = data => data.split("").map(d => +d);

const task = (cupsArray, cupsCount, repetitions, task) => {
    const printCups = current => {
        let first = current;
        let str = current.toString();
        while (cups.get(current) !== first) {
            current = cups.get(current);
            str += "," + current;
        }
        return str;
    }

    const cups = new Map();
    for (let i = 0; i < cupsArray.length-1; i++) {
        cups.set(cupsArray[i], cupsArray[i+1])
    }
    
    if (cupsCount > cupsArray.length) cups.set(cupsArray[cupsArray.length - 1], cupsArray.length + 1)

    for (let i = 10; i < cupsCount; i++) cups.set(i, i+1);
    
    if (cupsCount <= cupsArray.length) cups.set(cupsArray[cupsArray.length - 1], cupsArray[0]);
    else cups.set(cupsCount, cupsArray[0]);
    
    let currentCup = cupsArray[0];
    
    printCups(currentCup);
    
    for (let i = 0; i < repetitions; i++) {
        let firstOfThree = cups.get(currentCup);
        let secondOfThree = cups.get(firstOfThree);
        let thirdOfThree = cups.get(secondOfThree);
        let three = [ firstOfThree, secondOfThree, thirdOfThree ];
        cups.set(currentCup, cups.get(thirdOfThree));
        
        let destination = currentCup - 1;
        while (three.includes(destination) || destination === 0) {
            if (three.includes(destination)) destination--;
            if (destination === 0) destination = cupsCount;
        }
        
        cups.set(thirdOfThree, cups.get(destination));
        cups.set(destination, firstOfThree);

        currentCup = cups.get(currentCup);
        if (i % 1000000 === 0) console.log(i + " iteration steps");
    }
    
    if (task === 1) return printCups(1).split(",").slice(1).join("");
    
    return cups.get(1) * cups.get(cups.get(1));
    
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
