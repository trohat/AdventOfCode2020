console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const makeGrid = dimension => {
        const grid = [];
        for (let i = 0; i < yzDimension; i++) {
            grid.push([]);
            for (let j = 0; j < yzDimension; j++) {
                grid[i].push([]);
                for (let k = 0; k < dimension; k++) {
                    grid[i][j].push([]);
                    for (let l = 0; l < dimension; l++) {
                        grid[i][j][k].push(0);
                    }
                }
            }
        }
        return grid;
    }

    const grid = makeGrid(dimension);
    const middleLayer = Math.floor(grid.length / 2);
    const middleCoord = Math.floor(grid[0].length / 2);
    
    for (let j = 0; j < data.length; j++) {
        for (let k = 0; k < data[0].length; k++) { 
            let char = data[j].charAt(k);
            if (char === '#') char = 1;
            else if (char === '.') char = 0;
            else console.error("Unknown character");
            grid[middleLayer][middleLayer][j+shift-centerShift][k+shift-centerShift] = char;
        }
    }
    
    //console.log(grid);
    //console.log(grid[middleLayer]);
    //console.log(grid[middleLayer][middleLayer]);

    return grid;
};


const task2 = (grid) => {
    const deepCopy = grid => {
        const newGrid = [];
        for (let i = 0; i < grid.length; i++) {
            newGrid.push([]);
            for (let j = 0; j < grid[0].length; j++) { 
                newGrid[i].push([]);
                for (let k = 0; k < grid[0][0].length; k++) {
                    newGrid[i][j].push([ ...grid[i][j][k]]);
                }
            }
        }
        return newGrid;
    }
    
    for (let step = 0; step < 6; step++) {
        console.log("step " + step);
        let newGrid = deepCopy(grid);
        
        for (let i = 1; i < grid.length - 1; i++) {
            for (let j = 1; j < grid[0].length - 1; j++) {
                for (let k = 1; k < grid[0][0].length - 1; k++) {
                    for (let l = 1; l < grid[0][0][0].length - 1; l++) {
                    
                        let neighbors = 0;
                        for (let z = -1; z < 2; z++) {
                            for (let y = -1; y < 2; y++) {
                                for (let x = -1; x < 2; x++) {
                                    for (let w = -1; w < 2; w++) {
                                        if (z === 0 && y === 0 && x === 0 && w === 0) continue;
                                        neighbors += grid[z+i][y+j][x+k][w+l];
                                    }
                                }
                            }
                        }

                        let actCube = grid[i][j][k][l];

                        if (actCube === 1) {
                            if (neighbors === 2 || neighbors === 3) newGrid[i][j][k][l] = 1; else newGrid[i][j][k][l] = 0;
                        } 
                        else if (actCube === 0) {
                            if (neighbors === 3) newGrid[i][j][k][l] = 1; else newGrid[i][j][k][l] = 0;
                        } else console.error("Unknown state"); 
                    
                    }
                }
            }
        }

        grid = newGrid;
    }
    //console.log(grid);

    let alive = 0;
    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[0].length - 1; j++) {
            for (let k = 1; k < grid[0][0].length - 1; k++) {
                for (let l = 1; l < grid[0][0][0].length - 1; l++) {
                    alive += grid[i][j][k][l];
                }
            }
        }
    }
    return alive;
};

let testdata = `.#.
..#
###`;

const dimension = 20;
const shift = 10;
const centerShift = 3; 

const yzDimension = 16;
const yzShift = 8; 

// dimensions set to minimum now!
/*

these dimensions are good only for test data

const dimension = 20;
const shift = 10;
const centerShift = 3; 

const zDimension = 12;
const zShift = 6; 
*/

inputdata = prepare(splitLines(inputdata));
//testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), 112);

//console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 848);

console.log("Task 2: " + task2(inputdata));
