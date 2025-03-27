const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [n, m, r] = input.shift().split(" ").map(Number);

const values = input.shift().split(" ").map(Number);

const graph = Array(n + 1)
  .fill(0)
  .map(() => Array(n + 1).fill(Infinity));

for (let i = 1; i <= n; i++) {
  graph[i][i] = 0;
}

for (let i = 0; i < r; i++) {
  const [start, end, distance] = input[i].trim().split(" ").map(Number);
  graph[start][end] = distance;
  graph[end][start] = distance;
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (
        graph[i][k] + graph[k][j] < graph[i][j] &&
        graph[i][k] + graph[k][j] <= m
      ) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}

let answer = -1;

for (let i = 1; i <= n; i++) {
  const currVal = graph[i].reduce((prev, v, j) => {
    if (v <= m) {
      return prev + values[j - 1];
    } else {
      return prev;
    }
  }, 0);

  answer = Math.max(currVal, answer);
}

console.log(answer);
