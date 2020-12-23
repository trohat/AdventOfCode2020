console.log("funguju");

const prepare = data => data.split("").map(d => +d);



inputdata = prepare(inputdata);

const task = (cups, cupsCount, repetitions, task) => {
    const printCups = currentCup => {
        let str = currentCup.value.toString();
        printCup = currentCup.next;
        while (printCup !== currentCup) {
            str += "," + printCup.value;
            printCup = printCup.next;
        }
        return str;
    }

    // creating linked list
    let lastCup;
    let firstCup;
    let start = true;
    for (let n of cups) {
        if (start) {
            firstCup = {
                value: n,
                next: null,
                previous: null
            };
            lastCup = firstCup;
            start = false;
        } else {
            let cup = {
                value: n,
                next: null,
                previous: lastCup
            }
            lastCup.next = cup;
            lastCup = cup;
        }
    } 
    for (let i = 10; i <= cupsCount; i++) {
        let cup = {
            value: i,
            next: null,
            previous: lastCup
        }
        lastCup.next = cup;
        lastCup = cup;
    }
    lastCup.next = firstCup;
    firstCup.previous = lastCup;

    console.log(firstCup);
    //console.log(printCups(firstCup));
    let currentCup = firstCup;

    for (let i = 0; i < repetitions; i++) {
        let firstOfThree = currentCup.next;
        let secondOfThree = firstOfThree.next;
        let thirdOfThree = secondOfThree.next;
        let three = [ firstOfThree.value, secondOfThree.value, thirdOfThree.value ];
        currentCup.next = thirdOfThree.next;
        thirdOfThree.next.previous = currentCup;
        
        let destination = currentCup.value - 1;
        while (three.includes(destination) || destination === 0) {
            if (three.includes(destination)) destination--;
            if (destination === 0) destination = cupsCount;
        }

        let destinationCupForwards = currentCup.next;
        let destinationCupBackwards = currentCup.previous;
        if (i % 10000 === 0) console.time("searching");
        let searchingSteps = 0;
        while (destinationCupForwards.value !== destination && destinationCupBackwards.value !== destination) {
            destinationCupForwards = destinationCupForwards.next;
            destinationCupBackwards = destinationCupBackwards.previous;
            searchingSteps++;
        }
        if (i % 10000 === 0) console.timeEnd("searching");
        if (i % 10000 === 0) console.log("searching steps", searchingSteps);

        let destinationCup;
        if (destinationCupForwards.value === destination) {
            destinationCup = destinationCupForwards;
        } else if (destinationCupBackwards.value === destination) {
            destinationCup = destinationCupBackwards;
        } else console.warn("Error in conditions");
        //console.log("Searching steps", searchingSteps);

        thirdOfThree.next = destinationCup.next;
        destinationCup.next.previous = thirdOfThree;
        
        destinationCup.next = firstOfThree;
        firstOfThree.previous = destinationCup;

        currentCup = currentCup.next;
        if (i % 10000 === 0) console.log(i + " iteration steps");
        //console.log("Move", (i+2) + ":" )
        //console.log(printCups(currentCup));
    }
    
    while (currentCup.value !== 1) currentCup = currentCup.next;
    if (task === 1) return printCups(currentCup).split(",").slice(1).join("");

    currentCup = currentCup.next;
    return currentCup.value * currentCup.next.value;

};

let testdata = `389125467`;

testdata = prepare(testdata);


//doEqualTest(task(testdata, 9, 100, 1), "67384529");

//console.log("Task 1: " + task(inputdata, 9, 100, 1));

console.log("");



console.log("");

//doEqualTest(task(testdata, 1000000, 100000), 149245887792);
console.time();
console.log("Task 2: " + task(inputdata, 1000000, 10000000));
console.timeEnd();
