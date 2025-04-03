const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const N = Number(input[inputIdx++]);
const arr = input[inputIdx].split(" ").map(Number);

function getMaxValue(arr) {
  let value = 0;
  for (let i = 0; i < N - 1; i++) {
    value += Math.abs(arr[i] - arr[i + 1]);
  }
  return value;
}

let maxValue = -Infinity;
const visited = Array(N).fill(false);
const newArr = Array(N).fill(0);

function backTracking(newArr, step) {
  if (step == N) {
    maxValue = Math.max(maxValue, getMaxValue(newArr));
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    newArr[step] = arr[i];
    backTracking(newArr, step + 1);
    visited[i] = false;
  }
}

backTracking(newArr, 0);
console.log(maxValue);
