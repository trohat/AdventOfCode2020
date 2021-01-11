console.log("AOC 2020 - Day 22: Crab Combat");

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

const letsPlay = ( p1, p2, main ) => {
    p1 = [ ... p1];
    p2 = [ ... p2];
    let p1card, p2card;
    //console.warn("New game begins, decks:");
    //console.log("P1:", p1);
    //console.log("P2:", p2);
    const states = [];
    while (p1.length > 0 && p2.length > 0) {

        let state = p1.toString() + "-" + p2.toString();
        // not finished: checking for the main game and adapting return value for that
        if (states.includes(state)) return 1;
        else states.push(state);
        //console.log("New round begins, decks:");
        //console.log("P1:", p1);
        //console.log("P2:", p2);
        
        p1card = p1.shift();
        p2card = p2.shift();
        if (p1card <= p1.length && p2card <= p2.length) {
            //console.log(p1card, p2card);
            if (letsPlay(p1.slice(0, p1card), p2.slice(0,p2card), false) === 1) {
                p1.push(p1card);
                p1.push(p2card);
                //console.log("P1 won a subgame");
                //console.log(p1, p2)
            } else {
                p2.push(p2card);
                p2.push(p1card);
                //console.log("P2 won a subgame");
                //console.log(p1, p2)
            }
        } else if (p1card > p2card) {
            p1.push(p1card);
            p1.push(p2card);
            //console.log("P1 won a round");
        } else if (p2card > p1card) {
            p2.push(p2card);
            p2.push(p1card);
            //console.log("P2 won a round");
        } else console.warn ("They are the same!");
    }
    //console.warn("Finishing game");
    if (!main) return p1.length > p2.length ? 1 : 2;
    return p1.length > p2.length ? p1 : p2;
}

const task2 = data => {
    let winningDeck = letsPlay(data[0], data[1], true);
    let score = 0;
    console.log(winningDeck)
    for (let i = 1; i <= winningDeck.length; i++) {
        score += winningDeck[winningDeck.length - i] * i;
    }
    return score;
}

let testdata = `Player 1:
43
19

Player 2:
2
29
14`;

testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), 306);

//console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 291);

console.log("Task 2: " + task2(inputdata));
