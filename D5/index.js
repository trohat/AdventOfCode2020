console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

inputdata = splitLines(inputdata);

re = /(\w{7})(\w{3})/;
const parseSeat = (seat) => {
  let [, rows, cols] = re.exec(seat);
  rows = rows.replace(/F/g, "0");
  rows = rows.replace(/B/g, "1");
  cols = cols.replace(/L/g, "0");
  cols = cols.replace(/R/g, "1");
  const row = parseInt(rows, 2);
  const col = parseInt(cols, 2);
  return row * 8 + col;
};

const task1 = (data) => {
  let highest = 0;
  data.forEach((seat) => {
    seat = parseSeat(seat);
    if (seat > highest) highest = seat;
  });

  return highest;
};

const task2 = (data) => {
    data = data.map(seat => parseSeat(seat));
    data.sort();
    let mySeat = 0;
    let searching = true;
    data.forEach(n =>{
        if (!data.includes(n+1) && searching) {
            mySeat = n + 1;
            searching = false;
        };
    })
    return mySeat;
};

console.log("");

console.log("Task 1: " + task1(inputdata));

console.log("");

console.log("Task 2: " + task2(inputdata));
