console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

inputdata = splitLines(inputdata);

console.log(inputdata);

const task1 = (data) => {
    let whiteTiles = new Set();
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
        if (whiteTiles.has(pos)) whiteTiles.delete(pos);
        else whiteTiles.add(pos);
    }
    return whiteTiles.size;

};

const task2 = data => {
 
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

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
