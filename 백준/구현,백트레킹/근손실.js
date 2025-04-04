const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

let inputIdx = 0;
const [N, K] = input[inputIdx++].split(" ").map(Number);
const kits = input[inputIdx].split(" ").map(Number);

const arr = Array(N).fill(0);
const visited = Array(N).fill(0);

let answer = 0;
function backTracking(step) {
  let weight = 500;
  for (let i = 0; i < step; i++) {
    weight -= K;
    weight += arr[i];
    if (weight < 500) return;
  }
  if (step == N) {
    answer++;
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    arr[step] = kits[i];
    backTracking(step + 1);
    visited[i] = false;
  }
}

backTracking(0);
console.log(answer);
