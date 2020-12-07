console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));


const prepare = data => {
    const bagGraph = {};
    const re = /(\w+ \w+) bags contain ((?:\d\d? \w+ \w+ bags?(, )?)*|no other bag)./
    data.forEach( d => {
        let [ , key, val ] = re.exec(d);
        if (val === "no other bag") val = null;
        else {
            let i;
            let count;
            valArr = [];
            for (let i = val.indexOf(" bag"); i !== -1;  i = val.indexOf(" bag")) {
                valArr.push(val.slice(0, i));
                count = 2;
                if (val.charAt(i + 4) === "s") count = 3;
                val = val.slice(i + 4 + count);
            }
            const re1 = /(\d\d?) (\w+ \w+)/; 
            val = valArr.map( v => {
                [ , count, type] = re1.exec(v);
                return { count: +count, type };
            });
        }
        bagGraph[key] = { bags: val};
    })
    return bagGraph;
}

inputdata = prepare(splitLines(inputdata));

const task1 = (bagGraph) => {
    let lastCount = 0;
    let count = 1;
    let bags = new Set();
    bags.add("shiny gold");
    while (!(count === lastCount)) {
        lastCount = count;
        //myBags = new Set();
        //bags.forEach (b => myBags.add(b));
        bags.forEach( bag => {
            Object.keys(bagGraph).forEach( bagParent => {
                bagGraph[bagParent].bags.forEach (bagChild => {
                    if (bagChild.type === bag) bags.add(bagParent);
                })
            })
        });
        //bags = new Set();
        //myBags.forEach (b => bags.add(b));
        count = bags.size;
    }
    return count - 1;
};

const task2 = bagGraph => {
    const countBags = bag => {
        if ("inside" in bagGraph[bag]) return bagGraph[bag].inside;
        const inside = bagGraph[bag].bags.reduce((accumulator, currentBag) => {
            return accumulator + currentBag.count * countBags(currentBag.type);
        }, 1);
        bagGraph[bag].inside = inside;
        return inside;
    }
    return countBags("shiny gold") - 1;
}

let testdata = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

let testdata2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

testdata = prepare(splitLines(testdata));

testdata2 = prepare(splitLines(testdata2));

console.log("");

doEqualTest(task1(testdata), 4);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 32);
doEqualTest(task2(testdata2), 126);

console.log("Task 2: " + task2(inputdata));
