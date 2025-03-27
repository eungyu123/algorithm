// 경로 복원

const getPath = (start, end) => {
  if (via[start][end] == null) {
    return [];
  }
  if (via[start][end] == end) {
    return [start, end];
  }
  const mid = via[start][end];
  const leftPath = getPath(start, mid);
  const rightPath = getPath(mid, end);
  return [...leftPath.slice(0, -1), ...rightPath];
};

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const N = Number(input.shift().trim());
const M = Number(input.shift().trim());

const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));
const via = Array(N + 1)
  .fill(0)
  .map(() => Array(N + 1).fill(null));

for (let i = 1; i <= N; i++) {
  graph[i][i] = 0;
}

for (let i = 0; i < M; i++) {
  const [start, end, distance] = input[i].split(" ").map(Number);
  graph[start][end] = Math.min(graph[start][end], distance);
  via[start][end] = end;
}

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (graph[i][k] + graph[k][j] < graph[i][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
        via[i][j] = k; // 올바른 경로 저장
      }
    }
  }
}

for (let i = 1; i <= N; i++) {
  const parsed = graph[i]
    .slice(1)
    .map((v) => (v === Infinity ? 0 : v)) // Infinity일 경우 0으로 변환
    .join(" ");
  console.log(parsed);
}

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    const path = getPath(i, j);
    if (path.length == 0) {
      console.log(0);
    } else {
      console.log(path.length, path.join(" "));
    }
  }
}
