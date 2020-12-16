console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = lines => {
    const genericRules = [];
    const rules = [];
    const tickets = [];
    let index = 0;
    
    const re1 = /([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)/;
    const reYourTicket = /your ticket:/;
    const reNearbyTickets = /nearby tickets:/;
    const re2 = /(\d+,?)+/;

    const parseLine = line => line.split(",").map(n => +n);

    while (re1.test(lines[index])) {
        const [ , fieldName, from1, to1, from2, to2 ]  = re1.exec(lines[index]);
        genericRules.push({ from: +from1, to: +to1 });
        genericRules.push({ from: +from2, to: +to2 });
        index++;
    }

    index++;
    if (!reYourTicket.test(lines[index])) console.error("Your ticket parsing failed (heading).");
    index++;
    if (!re2.test(lines[index])) console.error("Your ticket parsing failed (numbers).");
    tickets.push(parseLine(lines[index]));

    index +=2;
    if (!reNearbyTickets.test(lines[index])) console.error("Nearby tickets parsing failed.");
    index++;
    while (re2.test(lines[index])) {
        tickets.push(parseLine(lines[index]));
        index++;
    }

    return [ genericRules, tickets ];
};

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

const task1 = (data) => {
    const [ genericRules, tickets ] = data;
    let errorRate = 0;
    ticketsLoop: for (let i = 0; i < tickets.length; i++) {
        ticketLoop: for (let j = 0; j < tickets[i].length; j++) {
            const n = tickets[i][j];
            let valid = false;
            ruleLoop: for (let k = 0; k < genericRules.length; k++) {
                if (n >= genericRules[k].from && n <= genericRules[k].to) {
                    valid = true;
                }      
            }
            if (!valid) errorRate += n;
        }
    }
    return errorRate;
};

const task2 = data => {
    
}

let testdata = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

testdata = prepare(splitLines(testdata));

console.log(testdata);

doEqualTest(task1(testdata), 71);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
