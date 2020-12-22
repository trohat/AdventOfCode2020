console.log("funguju");

const splitLines = (data) => data.split("\n\n");

const prepare = data => data.map(d => d.split("\n")).map (player => player.filter (line => !line.startsWith("Player")).map (d => +d));

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

const task1 = (data) => {
    let [ p1, p2 ] = data;
    while (p1.length > 0 && p2.length > 0) {
        p1card = p1.shift();
        p2card = p2.shift();
        if (p1card > p2card) {
            p1.push(p1card);
            p1.push(p2card);
        } else if (p2card > p1card) {
            p2.push(p2card);
            p2.push(p1card);
        } else console.warn ("They are the same!");
    }
    let winningDeck = p1.length > p2.length ? p1 : p2;
    let score = 0;
    console.log(winningDeck)
    for (let i = 1; i <= winningDeck.length; i++) {
        score += winningDeck[winningDeck.length - i] * i;
        console.log(winningDeck[i-1], i)
    }
    return score;
};

const task2 = data => {
 
}

let testdata = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 306);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
