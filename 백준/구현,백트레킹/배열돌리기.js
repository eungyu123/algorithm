const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const [N, M, K] = input[inputIdx++].split(" ").map(Number);

const initialArr = [];
for (let i = 0; i < N; i++) {
  const arr = input[inputIdx++].split(" ").map(Number);
  initialArr.push(arr);
}

const rotates = [];
for (let i = 0; i < K; i++) {
  const arr = input[inputIdx++].split(" ").map(Number);
  rotates.push(arr);
}

function rotate(arr, r, c, s) {
  for (let i = s; i >= 1; i--) {
    const top = r - i - 1;
    const down = r + i - 1;
    const left = c - i - 1;
    const right = c + i - 1;
    const rightTop = arr[top][right];
    const leftTop = arr[top][left];
    const rightDown = arr[down][right];
    const leftDown = arr[down][left];
    // 왼쪽에서 오른쪾
    for (let j = right; j >= left + 2; j--) {
      arr[top][j] = arr[top][j - 1];
    }
    arr[top][left + 1] = leftTop;
    // 위에서 아래
    for (let j = down; j >= top + 2; j--) {
      arr[j][right] = arr[j - 1][right];
    }
    arr[top + 1][right] = rightTop;
    // 오른쪽에서 왼쪽
    for (let j = left; j <= right - 2; j++) {
      arr[down][j] = arr[down][j + 1];
    }
    arr[down][right - 1] = rightDown;
    // 아래에서 위로
    for (let j = top; j <= down - 2; j++) {
      arr[j][left] = arr[j + 1][left];
    }
    arr[down - 1][left] = leftDown;
  }
}

function getResult(arr, order) {
  // 깊은 복사
  const newArr = arr.map((row) => [...row]);

  for (let i = 0; i < K; i++) {
    const [r, c, s] = rotates[order[i]];
    rotate(newArr, r, c, s);
  }

  const result = newArr.reduce((prev, curr) => {
    const currValue = curr.reduce((prev_, curr_) => prev_ + curr_, 0);
    return currValue < prev ? currValue : prev;
  }, Infinity);

  return result;
}

const order = Array(K).fill(0);
const visited = Array(K).fill(false);
let answer = Infinity;
function backTracking(step) {
  if (step == K) {
    answer = Math.min(answer, getResult(initialArr, order));
  }

  for (let i = 0; i < K; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    order[step] = i;
    backTracking(step + 1);
    visited[i] = false;
  }
}

backTracking(0);
console.log(answer);
