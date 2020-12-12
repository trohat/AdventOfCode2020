console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const re = /(\w)(\d+)/;
const prepare = (data) =>
  data.map((i) => {
    const [, letter, number] = re.exec(i);
    return { letter, number: +number };
  });

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

const task1 = (data) => {
  let posX = 0;
  let posY = 0;
  let dir = 0;

  const directions = [
      { where: "E", x: 1, y: 0},
      { where: "S", x: 0, y: 1},
      { where: "W", x: -1, y: 0},
      { where: "N", x: 0, y: -1}];

  let n;
  data.forEach((instr) => {
    switch (instr.letter) {
      case "N":
        posY -= instr.number;
        break;
      case "S":
        posY += instr.number;
        break;
      case "E":
        posX += instr.number;
        break;
      case "W":
        posX -= instr.number;
        break;
      case "R":
        n = instr.number / 90;
        dir = (dir + n) % 4;
        break;
      case "L":
        n = instr.number / 90;
        dir = (dir + 3 * n) % 4;
        break;
      case "F":
        posX += directions[dir].x * instr.number;
        posY += directions[dir].y * instr.number;
        break;
    }
  });
  console.log(posX, posY);
  return Math.abs(posX) + Math.abs(posY);
};

const task2 = (data) => {};

let testdata = `F10
N3
F7
R90
F11`;

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 25);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
