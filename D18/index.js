console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

inputdata = splitLines(inputdata);

const task1 = (data) => { 
    const eval = expr => {
        
        let number = null;
        let lastOp;
        let slice = 0;
        
        while (expr.length > 0) {
            const digit = /\d+/y;
            const plus = /\+/y;
            const times = /\*/y;
            const space = /\s/y;
            switch (true) {
                case digit.test(expr): 
                    let digits = expr.slice(0, digit.lastIndex);
                    if (number === null) number = +digits;
                    else if (lastOp === "times") number *= +digits; else number += +digits;
                    slice = digit.lastIndex;
                    break;
                case plus.test(expr):
                    lastOp = "plus";
                    slice = 1;
                    break;
                case times.test(expr):
                    lastOp = "times";
                    slice = 1;
                    break;
                case space.test(expr):
                    slice = 1;
                    break;
                default:
                    console.error("Unknown character in exec!");
            }
            expr = expr.slice(slice);
            //console.log(expr);
        }
        return number;
    }
    
    const re = /\([ *+\d]+\)/;
    let sum = 0;
    
    data.forEach(line => {
        while (result = re.exec(line)) {
            let n = eval(result[0].slice(1, result[0].length-1));
            line = line.replace(re, n);
        }
        sum += eval(line);
    })

    return sum;
};

const task2 = data => {
 
}

let testdata = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata), 13632);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
