console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

inputdata = splitLines(inputdata);

const compareArrays = (arr1, arr2) => {
    let same = true;
    arr1.forEach((field, index) => {
        if (field !== arr2[index]) same = false;
    })
    return same;
}

String.prototype.setCharAt = function(index, char) {
    return this.substring(0,index) + char + this.substring(index+1);
}

const countCharInArray = (char, array) => array.reduce((accumulator, str) => accumulator + str.split(char).length-1, 0);

const task1 = (grid) => {
    const maxY = grid.length;

    const countNeighbours = ( x,y, grid ) => {
        const maxY = grid.length - 1;
        let n = 0;
        if ( y > 0) {
            n += (grid[y-1].charAt(x-1) === "#");
            n += (grid[y-1].charAt(x) === "#");
            n += (grid[y-1].charAt(x+1) === "#");
        } 
        n += (grid[y].charAt(x-1) === "#");
        n += (grid[y].charAt(x+1) === "#");
        if ( y < maxY) {
            n += (grid[y+1].charAt(x-1) === "#");
            n += (grid[y+1].charAt(x) === "#");
            n += (grid[y+1].charAt(x+1) === "#");
        } 
        return n;
    }

    let end = false;
    while (!end) {
        let lastGrid = [...grid];
        grid = grid.map( (line, index) => {
            for (let i = 0; i < line.length; i++) {
                let seat = line.charAt(i);
                const n = countNeighbours(i, index, lastGrid);
                if (seat === "L" && n === 0) line = line.setCharAt(i, "#");
                if (seat === "#" && n >= 4) line = line.setCharAt(i, "L");
            }
            return line;
        })
        if (compareArrays(grid, lastGrid)) end = true;
    }
    return countCharInArray('#', grid);
};

const task2 = data => {
 
}

let testdata = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata), 37);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
