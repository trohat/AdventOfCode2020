console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data.map(d => +d);

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

Array.prototype.sum = function () {
    return this.reduce((a,b) => a+b, 0);
}

Array.prototype.min = function () {
    return Math.min(...this);
}

Array.prototype.max = function () {
    return Math.max(...this);
}

const task1 = (data, preamble) => {
    for (let i = preamble; i < data.length; i++) {
        let found = false;
        let actualArr = data.slice(i - preamble, i);
        let val = data[i];
        for (let j = 0; j < actualArr.length; j++) {
            if (actualArr[j] === val / 2) continue;
            if (actualArr.includes(val - actualArr[j])) {
                found = true;
                break;
            }
        }
        if (!found) {
            return val;
        }
    }
};

const task2 = (data, preamble) => {
    const invalid = task1(data, preamble);
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 2; j < data.length; j++) {
        const newArr = data.slice(i,j);
        if (newArr.sum() === invalid) return newArr.min() + newArr.max();
      }  
    }
 
}

let testdata = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata, 5), 127);

console.log("Task 1: " + task1(inputdata, 25));

console.log("");

doEqualTest(task2(testdata, 5), 62);

console.log("Task 2: " + task2(inputdata, 25));
