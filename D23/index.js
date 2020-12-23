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
                next: null
            };
            lastCup = firstCup;
            start = false;
        } else {
            let cup = {
                value: n,
                next: null
            }
            lastCup.next = cup;
            lastCup = cup;
        }
    } 
    for (let i = 10; i <= cupsCount; i++) {
        let cup = {
            value: i,
            next: null
        }
        lastCup.next = cup;
        lastCup = cup;
    }
    lastCup.next = firstCup;

    console.log(firstCup);
    //console.log(printCups(firstCup));
    let currentCup = firstCup;

    for (let i = 0; i < repetitions; i++) {
        let firstOfThree = currentCup.next;
        let three = [ firstOfThree.value, firstOfThree.next.value, firstOfThree.next.next.value ];
        currentCup.next = currentCup.next.next.next.next;
        
        let destination = currentCup.value - 1;
        while (three.includes(destination) || destination === 0) {
            if (three.includes(destination)) destination--;
            if (destination === 0) destination = cupsCount;
        }

        let destinationCup = currentCup.next;
        let searchingSteps = 0;
        while (destinationCup.value !== destination) {
            destinationCup = destinationCup.next;
            searchingSteps++;
        }
        console.log("Searching steps", searchingSteps);

        firstOfThree.next.next.next = destinationCup.next;
        destinationCup.next = firstOfThree;

        currentCup = currentCup.next;
        //console.log("Move", (i+2) + ":" )
        //console.log(printCups(currentCup));
        if (i % 1000 === 0) console.log("Step " + i);
    }
    
    while (currentCup.value !== 1) currentCup = currentCup.next;
    if (task === 1) return printCups(currentCup).split(",").slice(1).join("");

    currentCup = currentCup.next;
    return currentCup.value * currentCup.next.value;

};

let testdata = `389125467`;

testdata = prepare(testdata);


doEqualTest(task(testdata, 9, 100, 1), "67384529");

console.log("Task 1: " + task(inputdata, 9, 100, 1));

console.log("");



console.log("");

doEqualTest(task(testdata, 1000000, 10000), 149245887792);

//console.log("Task 2: " + task2(inputdata));
