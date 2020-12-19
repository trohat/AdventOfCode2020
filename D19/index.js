console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = (data) => {
  console.log(data.length + " lines total.");
  const reRule = /(\d+): (.+)/;
  const reMessage = /^(a|b)+$/;
  const rules = [];
  let messages = [];

  for (const line of data) {
    if (reMessage.test(line)) messages.push(line);
    if (reRule.test(line)) {
      const [, n, r] = reRule.exec(line);
      rules.push({ n: +n, r });
    }
  }

  messages.sort((a, b) => a.length - b.length);
  rules.sort((a, b) => a.n - b.n);

  let rulesArr = new Array(rules.length);
  for (const rule of rules) {
    rulesArr[rule.n] = rule.r;
  }
  let finishedRules = [];
  let reFinishedRule = /"(a|b)+"/;
  let reSimpleRule = /(\d+) (\d+)/;
  let reOrRule = /(\d+) (\d+) | (\d+) (\d+)/;
  rulesArr = rulesArr.map((rule, index) => {
    if (reFinishedRule.test(rule)) {
      console.log("Rule n." + index + " finished.");
      const [, r] = reFinishedRule.exec(rule);
      finishedRules.push(index);
      return [r];
    }
    return rule.split(" ");
  });
  console.log(rules.length);
  console.log(messages.length);
  console.log(rules);
  console.log(messages);
  console.log(rulesArr);
  return [messages, rulesArr, finishedRules];
};

const task1 = (data) => {
  const [messages, rules, finishedRules] = data;

  const makeRule = (rule, index) => {
    console.log("Making rule", rule, index);
    if (rule.length === 1) {
      for (const pattern of rules[+rule[0]]) rules[index].push(pattern);
    }
    if (rule.length === 2) {
      for (const pattern1 of rules[+rule[0]])
        for (const pattern2 of rules[+rule[1]])
          rules[index].push(pattern1 + pattern2);
    }
    if (rule.length === 3) {
        for (const pattern1 of rules[+rule[0]])
          for (const pattern2 of rules[+rule[1]])
            for (const pattern3 of rules[+rule[2]])
            rules[index].push(pattern1 + pattern2 + pattern3);
    }
    console.log("Rule made ", rules[index]);
  };

  // could be a while loop, but a 10-iteration for loop made the work
  for (let whileLoopIndex = 0; whileLoopIndex < 10; whileLoopIndex++) {
    console.log("Next loop n. " + whileLoopIndex + " starting.");
    nextRule: for (let i = 0; i < rules.length; i++) {
      if (finishedRules.includes(i)) {
        continue nextRule;
      }
      innerFor: for (let j = 0; j < rules[i].length; j++) {
        let el = rules[i][j];
        if (el === "|") continue innerFor;
        if (!finishedRules.includes(+el)) continue nextRule;
      }
      console.log("Found", i);
      const myRule = rules[i];
      rules[i] = [];
      console.log(myRule);
      pipe = myRule.indexOf("|");
      if (pipe === -1) makeRule(myRule, i);
      else {
        makeRule(myRule.slice(0, pipe), i);
        makeRule(myRule.slice(pipe + 1), i);
      }
      finishedRules.push(i);
    }
  }
  let logFinished = [...finishedRules];
  logFinished.sort((a,b) => a-b);
  for (let i = 0; i < 137; i++) {
      if (!(logFinished.includes(i))) console.log("Not finished", i);
  }

  const logRule = i => {
      console.log("Rule n." + i + " is " + rules[i]);
      console.log(rules[i].length);
  }
  logRule(0);
  logRule(8);
  logRule(11);
  logRule(31);
  logRule(42);


  /* Logging messages length
  const lengths = {};
  for (const message of messages) {
      let l = message.length;
      if (l in lengths) lengths[l]++;
      else lengths[l] = 1;
  }
  console.log(lengths);
  for (const l in lengths) { 
      console.log(l, lengths[l])
  }*/
  const rule42 = rules[42];
  const rule31 = rules[31];
  let countTotal = 0;
  
  for (let message of messages) {
    let count42 = 0;
    let count31 = 0;
    let maybe42 = true;
    while (maybe42) {
        let toTry = message.slice(0,8);
        if (rule42.includes(toTry)) {
            message = message.slice(8);
            count42++;
        } else maybe42 = false;
    }
    let maybe31 = true;
    while (maybe31) {
        let toTry = message.slice(0,8);
        if (rule31.includes(toTry)) {
            message = message.slice(8);
            count31++;
        } else maybe31 = false;
    }
    
    if (message.length === 0 && count42 > count31 && count31 > 0) countTotal++; 
  }

  return countTotal;

  /* Logic for task 1

  // just copying array to a fixed size array - will it be faster?
  const validationArray = new Array(rules[0].length);
  rules[0].forEach((r,i) => {
      validationArray[i] = r;
  })

  console.time();
  let count = 0;
  for (const message of messages) {
      if (validationArray.includes(message)) count ++;
  }
  console.timeEnd();
  return count;
  */
};

const task2 = (data) => {};

let testdata = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;

testdata = prepare(splitLines(testdata));
inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

console.log("");

//doEqualTest(task1(testdata), 7);

// dont be confused, this is task 2 now
console.log("Task 2: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
