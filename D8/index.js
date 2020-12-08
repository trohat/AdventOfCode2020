console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const re = /(\w{3}) ([-+])(\d+)/;
const prepare = (data) =>
  data.map((d) => {
    const [, instruction, sign, number] = re.exec(d);
    return {
      instruction,
      sign,
      number: +number,
      visited: false
    };
  });

inputdata = prepare(splitLines(inputdata));

//console.log(inputdata);

const task1 = (program) => {
  let position = 0;
  let accumulator = 0;
  let end = false;
  while (!end) {
    switch (program[position].instruction) {
      case "acc":
        program[position].visited = true;
        if (program[position].sign === "+")
          accumulator += program[position].number;
        else if (program[position].sign === "-")
          accumulator -= program[position].number;
        position += 1;
        break;
      case "jmp":
        program[position].visited = true;
        if (program[position].sign === "+")
          position += program[position].number;
        else if (program[position].sign === "-")
          position -= program[position].number;
        break;
      case "nop":
        program[position].visited = true;
        position += 1;
        break;
    }
    if (program[position].visited)
        end = true;
    //console.log(position, accumulator);
    //console.table(program);
  }
  return accumulator;
};

const task2 = (data) => {};

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

console.table(testdata);

doEqualTest(task1(testdata), 5);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
