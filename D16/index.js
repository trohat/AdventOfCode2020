console.log("AOC 2020 - Day 16: Ticket Translation");

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
        const [ , field, from1, to1, from2, to2 ]  = re1.exec(lines[index]);
        genericRules.push({ from: +from1, to: +to1 });
        genericRules.push({ from: +from2, to: +to2 });
        rules[field] = { from1: +from1, to1: +to1, from2: +from2, to2: +to2};
        index++;
    }

    index++;
    if (!reYourTicket.test(lines[index])) console.error("Your ticket parsing failed (heading).");
    index++;
    if (!re2.test(lines[index])) console.error("Your ticket parsing failed (numbers).");
    tickets.push({ values: parseLine(lines[index]), valid: true});

    index +=2;
    if (!reNearbyTickets.test(lines[index])) console.error("Nearby tickets parsing failed.");
    index++;
    while (re2.test(lines[index])) {
        tickets.push({ values: parseLine(lines[index]), valid: true});
        index++;
    }

    return [ genericRules, tickets, rules ];
};

inputdata = prepare(splitLines(inputdata));

const task1 = (data) => {
    const [ genericRules, tickets ] = data;
    let errorRate = 0;
    tickets.forEach( ticket => {
        ticket.values.forEach(number => {
            let valid = false;
            genericRules.forEach( rule => {
                if (number >= rule.from && number <= rule.to) {
                    valid = true;
                }  
            });
            if (!valid) { 
                errorRate += number;
                ticket.valid = false;
            }

        })
    })
    return errorRate;
};

const task2 = data => {
    const [ , tickets, rules ] = data;
    const validTickets = tickets.filter(ticket => ticket.valid);
    const fieldsLength = validTickets[0].values.length;
    let candidates = [];
    for (let i = 0; i < fieldsLength; i++) candidates.push([]);
    
    Object.keys(rules).forEach( field => {
        const from1 = rules[field].from1; 
        const to1 = rules[field].to1; 
        const from2 = rules[field].from2; 
        const to2 = rules[field].to2; 
        for (let i = 0; i < fieldsLength; i++) {
            let candidate = true;
            validTickets.forEach(validTicket => {
                 const value = validTicket.values[i];
                 if (!((value >= from1 && value <= to1) || (value >= from2 && value <= to2))) candidate = false;
            })
            if (candidate) candidates[i].push(field);
        }
    })
    
    let excludedIndexes = [];
    for (let i = 0; i < fieldsLength; i++) {
        let newIndex;
        candidates.forEach((can, index) => {
            if ((can.length === 1) && (!excludedIndexes.includes(index))) newIndex = index;
        });
        excludedIndexes.push(newIndex);
        field = candidates[newIndex][0];
        candidates = candidates.map((candidate, index) => {
            if (!excludedIndexes.includes(index)) return candidate.filter( f => f !== field);
            return candidate;
        })
    }

    const myTicket = tickets[0].values;

    return myTicket.reduce((accumulator, current, i) => {
        if (candidates[i][0].includes("departure")) return accumulator * current;
        else return accumulator;
    }, 1);
}

let testdata1 = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

let testdata2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));

doEqualTest(task1(testdata1), 71);


console.log("Task 1: " + task1(inputdata));

console.log("");

console.log("Task 2: " + task2(inputdata));
