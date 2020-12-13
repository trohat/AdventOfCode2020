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

const task2 = (data) => {
  let wPosX = 10;
  let wPosY = -1;
  let shipPosX = 0;
  let shipPosY = 0;

  const directions = [
      { where: "E", x: 1, y: 0},
      { where: "S", x: 0, y: 1},
      { where: "W", x: -1, y: 0},
      { where: "N", x: 0, y: -1}];

  let n, oldPosX, oldPosY;
  data.forEach((instr) => {
    switch (instr.letter) {
      case "N":
        wPosY -= instr.number;
        break;
      case "S":
        wPosY += instr.number;
        break;
      case "E":
        wPosX += instr.number;
        break;
      case "W":
        wPosX -= instr.number;
        break;
      case "R":
        n = instr.number / 90;
        for (let i = 0; i < n; i++) {
            oldPosX = wPosX;
            oldPosY = wPosY;
            wPosY = oldPosX;
            wPosX = -oldPosY;
        }
        break;
      case "L":
        n = instr.number / 90;
        for (let i = 0; i < n; i++) {
            oldPosX = wPosX;
            oldPosY = wPosY;
            wPosY = -oldPosX;
            wPosX = oldPosY;
        }
        break;
      case "F":
        shipPosX += wPosX * instr.number;
        shipPosY += wPosY * instr.number;
        break;
    }
    console.log(wPosX, wPosY, shipPosX, shipPosY);
  });
  console.log(shipPosX, shipPosY);
  return Math.abs(shipPosX) + Math.abs(shipPosY);
};

let testdata = `F10
N3
F7
R90
F11`;

testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), 25);

//console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 286);

console.log("Task 2: " + task2(inputdata));
