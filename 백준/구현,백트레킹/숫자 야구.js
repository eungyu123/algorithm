const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const N = Number(input.shift());
const arrs = input.map((arr, i) => arr.split(" ").map(Number));

for (let i = 0; i < N; i++) {}

const arr = Array(3).fill(0);
const visited = Array(3).fill(false);
const answer = [];

function backtracking(step) {
  if (step == 3) {
    if (test()) answer.push([...arr]);
    return;
  }

  for (let i = 1; i <= 9; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    arr[step] = i;
    backtracking(step + 1);
    visited[i] = false;
  }
}

function test() {
  for (let i = 0; i < N; i++) {
    const [num, strike, ball] = arrs[i];
    const numarr = num.toString().split("").map(Number);
    let strikeCtn = 0;
    let ballCtn = 0;
    for (let i = 0; i < 3; i++) {
      if (numarr[i] == arr[i]) strikeCtn++;
      if (arr.includes(numarr[i])) ballCtn++;
    }
    ballCtn = ballCtn - strikeCtn;
    if (strike != strikeCtn || ball != ballCtn) return false;
  }
  return true;
}

backtracking(0);
console.log(answer.length);
