console.log("funguju");

String.prototype.count = function(char) {
    return this.split(char).length-1;
}

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(mask|mem\[\d+\]) = (\w+)/;
    const re2 = /(mem)\[(\d+)\]/;
    return data.map( line => {
        let [ , type, number ] = re.exec(line)
        if ( type === "mask" ) return { type, number };
        else {
            number = +number;
            let address;
            [ , type, address ] = re2.exec(type);
            return { type, address, number };
        }
    });
}

inputdata = prepare(splitLines(inputdata));

const task1 = (data) => {
    const countNew = (n) => {
        let nString = n.toString(2);
        nString = nString.padStart(mask.length, "0");
        let newString = "";
        for (let i = 0; i < nString.length; i++) {
            let char;
            if (mask.charAt(i) === "X") char = nString.charAt(i);
            else char = mask.charAt(i);
            newString += char;
        }
        return parseInt(newString, 2);
    }

    let mask;
    let memory = {};
    data.forEach( instruction => {
        if (instruction.type === "mask") mask = instruction.number;
        else {
            let n = countNew(instruction.number);
            memory[instruction.address] = n;
        }
    });
    return Object.keys(memory).reduce((accumulator, currValue) => accumulator + memory[currValue], 0);
};

const task2 = data => {
    const writeAll = (addr, n) => {
        let count = addr.count("X");
        allCount = Math.pow(2,count);
        for (let i = 0; i < allCount; i++) {
            let iBin = i.toString(2);
            iBin = iBin.padStart(count, "0");
            let k = 0;
            let newAddr = "";
            for (let j = 0; j < addr.length; j++) {
                let char;
                if (addr.charAt(j) === "X") { char = iBin.charAt(k); k++; }
                else char = addr.charAt(j);
                newAddr += char;
            }
            memory[parseInt(newAddr, 2)] = n;
        }
    }

    const countNew = (address, n) => {
        let addrString = (+address).toString(2);
        addrString = addrString.padStart(mask.length, "0");
        let newAddrString = "";
        for (let i = 0; i < addrString.length; i++) {
            let char;
            if (mask.charAt(i) === "0") char = addrString.charAt(i);
            else if (mask.charAt(i) === "1") char = "1";
            else if (mask.charAt(i) === "X") char = "X";
            newAddrString += char;
        }
        writeAll(newAddrString, n);
    }

    let mask;
    let memory = {};
    data.forEach( instruction => {
        if (instruction.type === "mask") mask = instruction.number;
        else {
            countNew(instruction.address, instruction.number);
        }
    });
    return Object.keys(memory).reduce((accumulator, currValue) => accumulator + memory[currValue], 0);
}

let testdata = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), 165);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 208);

console.log("Task 2: " + task2(inputdata));
