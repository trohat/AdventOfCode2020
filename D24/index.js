console.log("AOC 2020 - Day 24: Lobby Layout");

const splitLines = (data) => data.split(String.fromCharCode(10));

inputdata = splitLines(inputdata);

console.log(inputdata);

const task1 = (data, task) => {
    let blackTiles = new Set();
    for (let line of data) {
        let tileX = 0;
        let tileY = 0;
        while (line !== "") {
            let direction = line.charAt(0);
            if (direction === "e" || direction === "w") line = line.slice(1);
            else {
                direction = line.slice(0,2);
                line = line.slice(2);
            }
            switch (direction) {
                case "w":
                    tileX -= 1;
                    break;
                case "e":
                    tileX += 1;
                    break;
                case "ne":
                    tileY -= 1;
                    break;
                case "sw":
                    tileY += 1;
                    break;
                case "nw":
                    tileX -= 1;
                    tileY -= 1;
                    break;
                case "se":
                    tileY += 1;
                    tileX += 1;
                    break;
                default:
                    console.error("Bad robot... wait, I mean bad direction!");
            }
        }
        let pos = [ tileX, tileY ].toString();
        if (blackTiles.has(pos)) blackTiles.delete(pos);
        else blackTiles.add(pos);
    }
    if (task === 2) return blackTiles;
    return blackTiles.size;

};

const task2 = data => {
    let blackTiles = task1(data, 2);
    const neighborsCoords = [ [-1, -1], [ -1, 0], [ 0, -1], [ 0, 1], [ 1, 0], [ 1, 1] ];
    console.log(blackTiles);

    // repetitions
    for (let i = 0; i < 100; i++) {
         let countNewTiles = new Map();

         // all tiles
         for (const tile of blackTiles) {
            let [ x, y ] = tile.split(",");
            x = +x;
            y = +y;
            let count = 0;

            // all neighbors
            for (const neighbor of neighborsCoords) {
                let nTileX = x + neighbor[0];
                let nTileY = y + neighbor[1];
                let nTile = [ nTileX, nTileY ].toString();
                if (blackTiles.has(nTile)) count++;
                else if (countNewTiles.has(nTile)) countNewTiles.set(nTile, countNewTiles.get(nTile) + 1);
                else countNewTiles.set(nTile, 1);
            }
            countNewTiles.set(tile, count);

         }
         
         for (const entry of countNewTiles) {
            const [ tile, count ] = entry;
            if (blackTiles.has(tile) && (count === 0 || count > 2)) blackTiles.delete(tile);
            else if (!blackTiles.has(tile) && count === 2) blackTiles.add(tile);
         }
         console.log("Day " + (i + 1) + ": size " + blackTiles.size);
    }

    return blackTiles.size;
}

let testdata = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata), 10);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 2208);

console.log("Task 2: " + task2(inputdata));
