console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const re = /(\w{3}) ([-+]\d+)/;
const prepare = (data) =>
  data.map((d) => {
    const [, text, number] = re.exec(d);
    return {
      text,
      number: +number,
      visited: false,
    };
  });

inputdata = prepare(splitLines(inputdata));

const runProgram = (program) => {
  let position = 0;
  let accumulator = 0;
  let end = false;
  let found = false;
  while (!end) {
    program[position].visited = true;
    switch (program[position].text) {
      case "acc":
        accumulator += program[position].number;
        position += 1;
        break;
      case "jmp":
        position += program[position].number;
        break;
      case "nop":
        position += 1;
        break;
    }
    if (position >= program.length) {
      found = accumulator;
      end = true;
    } else if (program[position].visited) {
      end = true;
    }
  }
  return found;
};

const task2 = (program) => {
  let final = 0;
  program.forEach((instruction, index) => {
    let actProgram = [];
    program.forEach((i) => actProgram.push({ ...i }));
    if (instruction.text === "jmp")
      actProgram[index] = { ...actProgram[index], text: "nop" };
    else if (instruction.text === "nop")
      actProgram[index] = { ...actProgram[index], text: "jmp" };
    const result = runProgram(actProgram);
    if (result) final = result;
  });
  return final;
};

let testdata = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

testdata = prepare(splitLines(testdata));

//doEqualTest(runProgram(testdata), 5);

//console.log("Task 1: " + runProgram(inputdata));

console.log("");

doEqualTest(task2(testdata), 8);

console.log("Task 2: " + task2(inputdata));
