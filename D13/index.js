console.log("AOC 2020 - Day 13: Shuttle Search");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = (data) => {
    const myTime = +data[0];
    const buses = data[1]
        .split(",")
        .filter((bus) => bus !== "x")
        .map((b) => +b);
    return [myTime, buses];
};

const prepare2 = (data) => {
    const myTime = +data[0];
    const buses = data[1].split(",").map((b) => (b === "x" ? "x" : +b));
    return [myTime, buses];
};

inputdata = prepare2(splitLines(inputdata));

console.log(inputdata);

const task1 = (data) => {
    const [myTime, buses] = data;
    let bestTime = myTime;
    let bestBus = 0;
    buses.forEach((bus) => {
        let waitTime = bus - (myTime % bus);
        console.log(waitTime, bus);
        if (waitTime < bestTime) {
            bestTime = waitTime;
            bestBus = bus;
        }
    });
    return bestBus * bestTime;
};

const task2 = (data) => {
    const [myTime, buses] = data;
    let betterBuses = [];
    buses.forEach((bus, index) => {
        if (bus === "x") return;
        if (index === 0) return;
        let helpIndex = index;
        while (helpIndex > bus) helpIndex -= bus;
        betterBuses.push({
            number: bus,
            remainder: bus - helpIndex,
            waitingTime: helpIndex,
        });
    });
    console.log(betterBuses);
    const obj = betterBuses.reduce(
        (accumulator, currentBus) => {
            cycleLen = accumulator.number * currentBus.number;
            for (let i = accumulator.remainder; i < cycleLen; i += accumulator.number) {
                if (
                    //i % accumulator.number === accumulator.remainder &&
                    i % currentBus.number === currentBus.remainder
                )
                    return { number: cycleLen, remainder: i };
            }
        },
        {
            number: buses[0],
            remainder: 0,
        }
    );
    return obj.remainder;
};

let testdata = `5
17,x,13,19`;

testdata = prepare2(splitLines(testdata));

console.log("");

doEqualTest(task2(testdata), 3417);

console.log(task2(inputdata));


/* Explanation in Czech, copy from facebook:
Hledám číslo, které dává po dělení jinými čísly daný zbytek. 
(Dělitelé jsou čísla busů, zbytky jsou (číslo busu minus pořadí busu), někdy je potřeba výpočet zbytku ještě upravit). 
Kdybych to hledal pro všechna čísla najednou, tak musím projít všech 10e15 čísel s iterací po jedničce, a to je neefektivní. 
Ale můžu to hledat po dvojicích. 
Takže první dvojice busů, pak výsledek té první dvojice a třetí bus, atd. 
A nemusím iterovat po jedničce, ale vždycky po nejmenším společném násobku té minulé dvojice. 
(Tj. například LCM minulé dvojice bylo 30, nový bus je číslo 11. 
Tedy hledám číslo, co po dělení třiceti dává zbytek x a po dělení 11 dává zbytek y. 
Stačí začít na číslu x a iterovat po třicítce, zbylá čísla jsou nezajímavá. 
A pokud jsem dopředu si jistý, že (y < 11), tak těch iterací bude maximálně 11.)

Navíc, i ten LCM (nejmenší společný násobek) můžu z řešení vyhodit, pokud si všimnu, že všechna čísla busů v testech i v zadání jsou prvočísla. Pak stačí místo LCM normální krát.
*/