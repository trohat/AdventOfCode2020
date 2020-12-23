console.log("funguju");

const prepare = data => data.split("").map(d => +d);

inputdata = prepare(inputdata);

console.log(inputdata);

const task1 = (cups) => {
    let current = 0;
    for (let i = 0; i < 100; i++) {
        let three = cups.splice(current+1,3);
        if (three.length === 0) {
            three = three.concat(cups.splice(0,3));
            current -= 3;
        }
        if (three.length === 1) {
            three = three.concat(cups.splice(0,2));
            current -= 2;
        }
        if (three.length === 2) {
            three = three.concat(cups.splice(0,1));
            current -= 1;
        }
        let destination = cups[current] - 1;
        console.log(cups, three);
        let index = cups.indexOf(destination);
        while (index === -1) {
            destination--;
            if (destination < 1) destination = 9;
            index = cups.indexOf(destination);
        }
        cups.splice(index + 1, 0, ...three);
        if (index < current) current += 3;
        current++;
        if (current > 8) current = current - 9;
        //console.log("Destination", destination);
        //console.log("Index", index);
        //console.log("Current",current);
        //console.log("Step", i+2)
        //console.log("Cups",cups);
    }
    while (cups[0] !== 1) {
        let x = cups.shift();
        cups.push(x);
    }
    cups.shift();
    return cups.join("");
};

const task2 = data => {
 
}

let testdata = `389125467`;

testdata = prepare(testdata);



console.log("");

doEqualTest(task1(testdata), "67384529");

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
