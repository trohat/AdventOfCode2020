console.log("AOC 2020 - Day 3: Toboggan Trajectory");

const splitLines = (data) => data.split(String.fromCharCode(10));

inputdata = splitLines(inputdata);

const slopeX = 3;
const slopeY = 1;

const task1 = (data, slopeX, slopeY) => {
  let posX = 0;
  let posY = 0;

  let trees = 0;
  while (posY < data.length - slopeY) {
    posX = (posX + slopeX) % data[0].length;
    posY += slopeY;
    if (data[posY].charAt(posX) === "#") trees++;
  }

  return trees;
};

const task2 = data => {
    const slopesX = [ 1, 3, 5, 7, 1];
    const slopesY = [ 1, 1, 1, 1, 2];

    const trees = [];

    slopesX.forEach( (slope, index) => trees.push(task1(data, slope, slopesY[index])));

    return trees.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
}

const testdata = splitLines(`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`);

console.log("");

doEqualTest(task1(testdata, slopeX, slopeY), 7);

console.log("Task 1: " + task1(inputdata, slopeX, slopeY));

console.log("");

doEqualTest(task2(testdata), 336);

console.log("Task 2: " + task2(inputdata));
