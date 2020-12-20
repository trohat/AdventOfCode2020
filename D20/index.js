console.log("funguju");

String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}

Array.prototype.countChar = function(char) {
    return this.reduce((accumulator, str) => accumulator + str.split(char).length-1, 0);
} 

Array.prototype.rotateRight = function() {
    let newTile = [];
    for (let i = 0; i < this.length; i++) {
        newTile.push("");
    }
    for (const line of this) {
        for (let i = 0; i < line.length; i++) {
            newTile[i] = line.charAt(i) + newTile[i];
        }   
    }
    return newTile;
}

Array.prototype.rotateLeft = function() {
    return this.rotateRight().rotateRight().rotateRight();
}

Array.prototype.flip = function() {
    let newTile = [];
    for (const line of this) { 
        newTile.push(line.reverse());
    }
    return newTile;
}

const splitLines = (data) => data.split("\n" + "\n");

const tileMap = new Map();

const prepare = data => {
    data = data.map(tileData => {
        tileData = tileData.split("\n");
        //console.log(tileData);
        const titleRe = /Tile (\d+):/;
        let tile = [];
        let id;
        let firstCol = "";
        let lastCol = "";
        let firstRow, lastRow;
        tileData.forEach((line,index) => {
            if (titleRe.test(line)) {
                [ , id ] = titleRe.exec(line);
                //console.log(id);
            } else if (line !== "") {
                line = line.replace(/#/g, "1");
                line = line.replace(/\./g, "0");
                firstCol += line.charAt(0);
                lastCol += line.charAt(line.length-1);
                //console.log(line);
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
        //console.log("Clockwise:", clockwise);
        //console.log("Counter clockwise:", counterClockwise);

        //console.log("Tile:")
        //console.log(tile);
        tileMap.set(+id, { tile, dir: null, clockwise: clockwise.map(toBin), counterClockwise: counterClockwise.map(toBin)});
        return { id: +id, tile, dir: null, clockwise: clockwise.map(toBin), counterClockwise: counterClockwise.map(toBin)};
    });
    return data;
}

const finishPuzzle = (puzzleMap, tileMap) => {
    const puzzle = [];
    let puzzleIndex = 0;
    for (const puzzleLine of puzzleMap) {
        for (let i = 0; i < 8; i++) {
            puzzle.push("");
        }
        for (const tile of puzzleLine) {
            let myTile = tileMap.get(tile.tile).tile;
            if (tile.dir > 4) {
                myTile = myTile.flip();
                tile.dir -= 5;
            }
            for (let i = 0; i < tile.dir; i++) {
                myTile = myTile.rotateLeft();
            }
            myTile.forEach((tileLine, index) => {
                puzzle[index+puzzleIndex] += tileLine;
            })
        }
        puzzleIndex += 8;
    }
    return puzzle;
}

const findSeaMonsters = puzzle => {
    const findMonsters = puzzle => {
        let count = 0;
        let str = puzzle.join("");
        const reSeaMonster = /1.{77}1....11....11....111.{77}1..1..1..1..1..1/;
        while (reSeaMonster.test(str)) {
            let index = reSeaMonster.exec(str).index;
            str = str.slice(index+1);
            count++;
        }
        console.log("Monsters found:", count);
        if (count > best) best = count;
    }

    let best = 0;

    for (let i = 0; i < 4; i++) {
        findMonsters(puzzle);
        puzzle = puzzle.rotateRight();
    }

    puzzle = puzzle.flip();

    for (let i = 0; i < 4; i++) {
        findMonsters(puzzle);
        puzzle = puzzle.rotateRight();
    }
    return best;
}

const task = (data, isTest) => {
    //counting tile edges
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
    console.log("Corners:")
    let corners = [];
    for (const tile of data) {
        let c = 0;
        for (const n of tile.clockwise) {
            if (ones.includes(n)) c++;
        }
        if (c === 2) {
            console.log (tile.id);
            corners.push (tile.id);
        }
    }
    /*
    for (let i = 0; i < corners.length; i++) {
        let myTile = tileMap.get(corners[i]);
        console.log(myTile);
        for (const n of myTile.clockwise) {
            if (ones.includes(n)) console.log(n);
        }
    }*/

    let puzzle = [];
    let start = true;

    //CONSTANTS HERE, both real and test data
    
    let puzzleSize;
    let startingTile;
    let startingRotation;
    if (isTest === "test") {
        puzzleSize = 3;
        startingTile = 1951;
        startingRotation = 7;
    } else {
        puzzleSize = 12;
        startingTile = 1511;
        startingRotation = 0; // I dont want to rotate the first tile!
    }
    
    
    const newDirsForClockwise = [ 6, 5, 8, 7];
    const newDirsForAntiClockwise = [ 1, 0, 3, 2];

    const newDirsForVerticalClockwise = [ 5, 8, 7, 6];
    const newDirsForVerticalAntiClockwise = [ 0, 3, 2, 1];
    
    for (let i = 0; i < puzzleSize; i++) {
        puzzle.push([]);
        if (start) {
            start = false;
            // start first row
            puzzle[i].push({ tile: startingTile, dir: startingRotation});
            //tileMap.get(startingTile).dir = startingRotation;
        } else {
            // start next row
            let lastTile = puzzle[i-1][0];
            let searchForTile = 0;
            if (lastTile.dir < 5) searchForTile = tileMap.get(lastTile.tile).clockwise[(lastTile.dir + 2) % 4];
            else searchForTile = tileMap.get(lastTile.tile).counterClockwise[(lastTile.dir - 5 + 2) % 4];
            for (const tile of data) {
                if (tile.id === lastTile.tile) continue;
                if (tile.clockwise.includes(searchForTile)) {
                    const index = tile.clockwise.indexOf(searchForTile);
                    const newDir = newDirsForVerticalClockwise[index];
                    puzzle[i].push({ tile: tile.id, dir: newDir});
                    break;
                }
                if (tile.counterClockwise.includes(searchForTile)) {
                    const index = tile.counterClockwise.indexOf(searchForTile);
                    const newDir = newDirsForVerticalAntiClockwise[index];
                    puzzle[i].push({ tile: tile.id, dir: newDir});
                    break;
                }
            }
        }
        for (let j = 0; j < puzzleSize - 1; j++) {
            let lastTile = puzzle[i][j];
            let searchForTile = 0;
            if (lastTile.dir < 5) searchForTile = tileMap.get(lastTile.tile).clockwise[(lastTile.dir + 1) % 4];
            else searchForTile = tileMap.get(lastTile.tile).counterClockwise[(lastTile.dir - 5 + 1) % 4];
            for (const tile of data) {
                if (tile.id === lastTile.tile) continue;
                if (tile.clockwise.includes(searchForTile)) {
                    const index = tile.clockwise.indexOf(searchForTile);
                    const newDir = newDirsForClockwise[index];
                    puzzle[i].push({ tile: tile.id, dir: newDir});
                    break;
                }
                if (tile.counterClockwise.includes(searchForTile)) {
                    const index = tile.counterClockwise.indexOf(searchForTile);
                    const newDir = newDirsForAntiClockwise[index];
                    puzzle[i].push({ tile: tile.id, dir: newDir});
                    break;
                }
            }

        }
    }
    console.log("Tiles placed:");
    console.log(puzzle);
    
    const finishedPuzzle = finishPuzzle(puzzle, tileMap);
    const counted = finishedPuzzle.countChar("1")
    console.log("Counting #'s:", counted);
    const best = findSeaMonsters(finishedPuzzle);
    return counted - best * 15;
};


console.log("All tiles:")
console.log(tileMap);
//console.log(inputdata);

//testdata = prepare(splitLines(testdata));
//doEqualTest(task(testdata, "test"), 7);

console.log("");


inputdata = prepare(splitLines(inputdata));
console.log("Task 2: " + task(inputdata));

