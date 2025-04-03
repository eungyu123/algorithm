const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const N = Number(input[inputIdx++]);

const innings = [];
for (let i = 0; i < N; i++) {
  innings.push(input[inputIdx++].split(" ").map(Number));
}

const Order = Array(9).fill(0);
const visited = Array(9).fill(false);
// 4번타자는 1번 선수로 고정
Order[3] = 0;
visited[0] = true;

let maxValue = -1;
function backTracking(step) {
  if (step == 9) {
    // Order가 정해지고 이것에 대해서 결과를 구함
    maxValue = Math.max(maxValue, getResult());
    return;
  }

  if (step == 3) {
    backTracking(step + 1);
    return;
  }

  for (let i = 1; i < 9; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    Order[step] = i;
    backTracking(step + 1);
    visited[i] = false;
  }
}

function getResult() {
  let score = 0;
  let currRunner = 0;
  for (let i = 0; i < N; i++) {
    let out = 0;
    // 배열로 선언하면 시간초과 나옴
    let base3 = 0;
    let base2 = 0;
    let base1 = 0;
    while (out < 3) {
      if (currRunner >= 9) currRunner = 0;
      switch (innings[i][Order[currRunner++]]) {
        case 0:
          out++;
          break;
        case 1:
          score += base3;
          base3 = base2;
          base2 = base1;
          base1 = 1;
          break;
        case 2:
          score = score + base3 + base2;
          base3 = base1;
          base2 = 1;
          base1 = 0;
          break;
        case 3:
          score = score + base3 + base2 + base1;
          base3 = 1;
          base1 = base2 = 0;
          break;
        case 4:
          score = score + base3 + base2 + base1 + 1;
          base1 = base2 = base3 = 0;
          break;
      }
    }
  }

  return score;
}

backTracking(0);
console.log(maxValue);
