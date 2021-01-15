console.log("AOC 2020 - Day 11: Seating System");

const splitLines = (data) => data.split(String.fromCharCode(10));

inputdata = splitLines(inputdata);

const compareArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
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

const task2 = (grid) => {
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

    const countVisibles = ( x,y, grid ) => {
        const directions = [[-1,-1], [-1,0], [-1,1], [0, -1], [0, 1], [1,-1], [1,0], [1,1]];
        let n = 0;
        directions.forEach(dir => {
            actX = x;
            actY = y;
            while (true) {
                actX += dir[0];
                actY += dir[1];
                if (!(actY in grid)) break;
                if (actX < 0 || actX >= grid[0].length) break;
                let seat = grid[actY].charAt(actX);
                if (seat === ".") continue;
                n += (seat === "#");
                break;
            }
        })
        return n;
    }

    let end = false;
    while (!end) {
        let lastGrid = [...grid];
        grid = grid.map( (line, index) => {
            for (let i = 0; i < line.length; i++) {
                let seat = line.charAt(i);
                const n = countVisibles(i, index, lastGrid);
                if (seat === "L" && n === 0) line = line.setCharAt(i, "#");
                if (seat === "#" && n >= 5) line = line.setCharAt(i, "L");
            }
            return line;
        })
        if (compareArrays(grid, lastGrid)) end = true;
    }
    return countCharInArray('#', grid);
};

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

//doEqualTest(task1(testdata), 37);

//console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 26);

console.log("Task 2: " + task2(inputdata));
