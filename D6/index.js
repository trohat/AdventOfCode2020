console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10)+ String.fromCharCode(10));
const splitLines2 = (data) => data.split(String.fromCharCode(10)+String.fromCharCode(10)).map(d => d.split(String.fromCharCode(10)));

const prepare = data => {
    return data.map(str => {
        let newStr = "";
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) !== String.fromCharCode(10))
                newStr += str.charAt(i);
        }
        return newStr;
    })
}

inputdata1 = prepare(splitLines(inputdata));
inputdata2 = splitLines2(inputdata);

//console.log(inputdata);

const task1 = (data) => {
    let sum = 0;
    data.forEach(str => {
        let s1 = new Set();
        for (let i = 0; i < str.length; i++) {
            s1.add(str.charAt(i));
        }
        sum += s1.size;
    })
    return sum;
};

const task2 = (data1, data2) => {
    let sum = 0;
    data1.forEach((str, index) => {
        let obj = {};
        for (let i = 0; i < str.length; i++) {
            let myChar = str.charAt(i);
            if (!(myChar in obj)) obj[myChar] = 1;
            else obj[myChar] += 1;
        }
        Object.keys(obj).forEach(key => {
            if (obj[key] === data2[index].length) sum++;
        })
    })
    return sum;
}

let testdata = `abc

a
b
c

ab
ac

a
a
a
a

b`;

testdata1 = prepare(splitLines(testdata));
testdata2 = splitLines2(testdata);

console.log("");

doEqualTest(task1(testdata1),11);

console.log("Task 1: " + task1(inputdata1));

console.log("");

doEqualTest(task2(testdata1, testdata2), 6);

console.log("Task 2: " + task2(inputdata1, inputdata2));
