const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const [N, M, K] = input[inputIdx++].split(" ").map(Number);

const initialArr = [];
for (let i = 0; i < N; i++) {
  initialArr.push(input[inputIdx++].split(" ").map(Number));
}

const rotates = [];
for (let i = 0; i < K; i++) {
  rotates.push(input[inputIdx++].split(" ").map(Number));
}

function rotate(arr, r, c, s) {
  for (let i = 1; i <= s; i++) {
    const top = r - i - 1;
    const down = r + i - 1;
    const left = c - i - 1;
    const right = c + i - 1;

    let temp = arr[top][right];

    const directions = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

    let x = top;
    let y = right;
    for (const [dx, dy] of directions) {
      while (true) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < top || nx > down || ny < left || ny > right) break;
        arr[x][y] = arr[nx][ny];
        x = nx;
        y = ny;
      }
    }
    arr[top + 1][right] = temp;
  }
}

function getResult(arr, order) {
  const newArr = arr.map((row) => [...row]); // 깊은 복사

  for (const idx of order) {
    const [r, c, s] = rotates[idx];
    rotate(newArr, r, c, s);
  }
  //prettier-ignore
  return newArr.reduce((prev, row) => Math.min(prev, row.reduce((a, b) => a + b, 0)), Infinity);
}

const order = Array(K).fill(0);
const visited = Array(K).fill(false);
let answer = Infinity;

function backTracking(step) {
  if (step === K) {
    answer = Math.min(answer, getResult(initialArr, order));
    return;
  }

  for (let i = 0; i < K; i++) {
    if (!visited[i]) {
      visited[i] = true;
      order[step] = i;
      backTracking(step + 1);
      visited[i] = false;
    }
  }
}

backTracking(0);
console.log(answer);
