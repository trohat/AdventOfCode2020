console.log("AOC 2018 - Day 1: Report Repair");

const sum = 2020;

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = (data) => data.map((d) => +d);

inputdata = prepare(splitLines(inputdata));

const task1 = (data) => {
  result = null;
  data.forEach((d) => {
    if (data.includes(sum - d)) result = d * (sum - d);
  });
  return result;
};

const task2 = (data) => {
  result = null;
  data.forEach((d) => {
    data.forEach((d2) => {
      if (data.includes(sum - d - d2)) {
        result = d * d2 * (sum - d - d2);
      }
    });
  });
  return result;
};

const testdata = prepare(
  splitLines(`1721
              979
              366
              299
              675
              1456`)
);

doEqualTest(task1(testdata), 514579);

doEqualTest(task2(testdata), 241861950);

console.log("Task 1: " + task1(inputdata));
console.log("Task 2: " + task2(inputdata));
