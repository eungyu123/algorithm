const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [N, M, B] = input.shift().split(" ").map(Number);
let maxHeight = -Infinity;
let minHeight = Infinity;
const graph = [];
for (let i = 0; i < N; i++) {
  const arr = input[i].split(" ").map(Number);
  arr.forEach((v, i) => {
    maxHeight = Math.max(maxHeight, v);
    minHeight = Math.min(minHeight, v);
  });
  graph.push(arr);
}
maxHeight = Math.min(256, maxHeight);
minHeight = Math.min(256, minHeight);

let answer = [Infinity, -Infinity];
for (let height = minHeight; height <= maxHeight; height++) {
  flattening(height);
}

function flattening(height) {
  let time = 0;
  let inventory = B;

  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      const diff = height - graph[j][k];
      inventory -= diff;
      //time += +diff > 0 ? diff * 1 : diff * 2 * -1; //
      time = time + (diff > 0 ? diff * 1 : diff * 2 * -1); // 연산자 우선순위 신경쓰기
    }
  }
  if (inventory < 0) return;

  if (time < answer[0]) {
    [answer[0], answer[1]] = [time, height];
  }
  if (time == answer[0] && height > answer[1]) {
    [answer[0], answer[1]] = [time, height];
  }
}

console.log(answer.join(" "));
