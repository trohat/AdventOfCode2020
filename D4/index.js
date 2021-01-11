console.log("AOC 2020 - Day 4: Passport Processing");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
  const output = [];
  let str = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      output.push(str.trim());
      str="";
    } else {
      str += data[i] + " ";
    }
  }
  output.push(str.trim());
  return output;
}

inputdata = prepare(splitLines(inputdata));

const task1 = (data) => {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  let validPasswords = 0;
  outerLoop: for (let i = 0; i < data.length; i++) {
    actPass = data[i];
    for (let j = 0; j < requiredFields.length; j++) {
      let re = new RegExp(requiredFields[j] + ":");
      if (!re.test(actPass)) continue outerLoop;
    }
    validPasswords++;
  }
  return validPasswords;
};

const task2 = data => {
  const requiredFields = [/byr:(\d{4})/, /iyr:(\d{4})/, /eyr:(\d{4})/, /hgt:(\d+)(cm|in)/, /hcl:#[0-9a-f]{6}/, /ecl:(amb|blu|brn|gry|grn|hzl|oth)/, /pid:\d{9}\b/];
  const requiredRanges = [ { min: 1920, max: 2002 }, { min: 2010, max: 2020 }, { min: 2020, max: 2030 }, { min: 150, max: 193 }, { min: 59, max: 76 }]
  let validPasswords = 0;
  outerLoop: for (let i = 0; i < data.length; i++) {
    actPass = data[i];
    for (let j = 0; j < requiredFields.length; j++) {
      let re = requiredFields[j];
      if (!re.test(actPass)) {
        continue outerLoop;
      };
      if (j < 4) {
        let [ , n, unit ] = re.exec(actPass);
        range = j;
        if (unit === "in") range++;
        if (n < requiredRanges[range].min || n > requiredRanges[range].max) {
          continue outerLoop;
        }
      }
    }
    validPasswords++;
  }
  return validPasswords;
}

let testdata = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 8);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 4);

console.log("Task 2: " + task2(inputdata));
