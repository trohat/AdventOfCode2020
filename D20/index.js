console.log("funguju");

String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}

const splitLines = (data) => data.split("\n" + "\n");

const prepare = data => {
    data = data.map(tileData => {
        tileData = tileData.split("\n");
        const titleRe = /Tile (\d+):/;
        let tile = [];
        let id;
        let firstCol = "";
        let lastCol = "";
        let firstRow, lastRow;
        console.log(tileData);
        tileData.forEach((line,index) => {
            if (titleRe.test(line)) {
                [ , id ] = titleRe.exec(line);
            } else if (line !== "") {
                line = line.replace(/#/g, "1");
                line = line.replace(/\./g, "0");
                firstCol += line.charAt(0);
                lastCol += line.charAt(line.length-1);
                if (index === 1) firstRow = line;
                else if (index === 10) lastRow = line;
                else { 
                    line = line.slice(1,line.length - 1);
                    tile.push(line); 
                }
            }
        });
        const toBin = str => parseInt(str, 2);

        const clockwise = [];
        const counterClockwise = [];
        clockwise.push(firstRow, lastCol, lastRow.reverse(), firstCol.reverse());
        counterClockwise.push(firstRow.reverse(), firstCol, lastRow, lastCol.reverse());

        console.log(id, tile, clockwise, counterClockwise);

        return { id, tile, clockwise: clockwise.map(toBin), counterClockwise: counterClockwise.map(toBin)};
    });
    return data;
}

inputdata = prepare(splitLines(inputdata));

console.log("data here")
console.log(inputdata);


const task1 = (data) => {
    let jigsaw = new Map();
    for (const tile of data) {
        for (const n of tile.clockwise) {
            if (jigsaw.has(n)) jigsaw.set(n, jigsaw.get(n) + 1);
            else jigsaw.set(n, 1);
        }
        for (const n of tile.counterClockwise) {
            if (jigsaw.has(n)) jigsaw.set(n, jigsaw.get(n) + 1);
            else jigsaw.set(n, 1);
        }
    }
    let mapIt = jigsaw.entries();
    const ones = [];
    const twos = [];
    let next = mapIt.next();
    while (!next.done) {
        if (next.value[1] === 1) ones.push(next.value[0]);
        else if (next.value[1] === 2) twos.push(next.value[0]);
        else console.log("Another count, count =", next.value[1]);
        next = mapIt.next();
    }

    console.log("Different numbers", jigsaw.size);
    console.log("Ones", ones.length);
    console.log("Twos", twos.length);
    let result = 1;
    for (const tile of data) {
        let c = 0;
        for (const n of tile.clockwise) {
            if (ones.includes(n)) c++;
        }
        if (c === 2) {
            console.log (tile.id);
            result *= tile.id;
        }
    }
    return result;
};

const task2 = data => {
 
}

let testdata = ``;

testdata = splitLines(testdata);

console.log("");

//doEqualTest(task1(testdata), 7);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
