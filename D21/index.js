console.log("funguju");

Array.prototype.intersection = function() {
    return this.reduce((accumulator, currentArr) => accumulator.filter(x => currentArr.includes(x)), this[0]);
}; 

const objSize = obj => Object.keys(obj).length;

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const allergensToIngrs = {};
    const allIngrs = [];
    for (let line of data) {
        let [ ingrs, allergens] = line.split("(contains ");
        ingrs = ingrs.trim().split(" ");
        allIngrs.push(...ingrs);
        allergens = allergens.slice(0, allergens.length - 1).split(", ");
        for (const allergen of allergens) {
            if (allergen in allergensToIngrs) allergensToIngrs[allergen].push(ingrs);
            else allergensToIngrs[allergen] = [ingrs];
        }
    }
    return [ allergensToIngrs, allIngrs ];
};

inputdata = prepare(splitLines(inputdata));

//console.log(inputdata);
const task1 = (data) => {

    let [ allergensToIngrs, allIngrs ] = data;

    // finding correct ingredient
    for (let food in allergensToIngrs) {
        allergensToIngrs[food] = allergensToIngrs[food].intersection();
    }
    
    // removing duplicates
    let finishedAllergens = [];
    while (finishedAllergens.length < objSize(allergensToIngrs)) {
        let newAll;
        for (const all in allergensToIngrs) {
            if (allergensToIngrs[all].length === 1 && !finishedAllergens.includes(all)) newAll = all;
        }
        finishedAllergens.push(newAll);
        newIngr = allergensToIngrs[newAll][0];
        Object.keys(allergensToIngrs).forEach(key => {
            if (!finishedAllergens.includes(key)) allergensToIngrs[key] = allergensToIngrs[key].filter ( ingr => ingr !== newIngr);
        })
    }

    // counting ingredients without allergens
    const ingrsWithAlls = [];
    Object.keys(allergensToIngrs).forEach(key => ingrsWithAlls.push(allergensToIngrs[key][0]));
    allIngrs = allIngrs.filter(ingr => !ingrsWithAlls.includes(ingr));
    return allIngrs.length;
};

const task2 = data => {
    let allergensToIngrs = data[0];
    let ingrsToAlls = [];
    for (const all in allergensToIngrs) ingrsToAlls.push({ all, ingr: allergensToIngrs[all][0]});
    ingrsToAlls = ingrsToAlls.sort((a,b) => a.all > b.all ? 1 : -1);
    return ingrsToAlls.reduce((acc, curr) => acc + "," + curr.ingr, "").slice(1);
    
}

let testdata = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;

testdata = prepare(splitLines(testdata));


doEqualTest(task1(testdata), 5);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), "mxmxvkd,sqjhc,fvjkl");

console.log("Task 2: " + task2(inputdata));
