const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const [N, M] = input[inputIdx++].split(" ").map(Number);

const graph = Array(N + 1)
  .fill(0)
  .map(() => Array(0));

const indegree = Array(N + 1).fill(0);
const queue = [];
const answer = [];

for (let i = 0; i < M; i++) {
  const [start, end] = input[inputIdx++].split(" ").map(Number);
  graph[start].push(end);
  indegree[end] += 1;
}
for (let i = 1; i <= N; i++) {
  if (indegree[i] == 0) queue.push(i);
}

while (queue.length > 0) {
  const nextNode = queue.shift();
  answer.push(nextNode);

  for (let end of graph[nextNode]) {
    indegree[end] -= 1;
    if (indegree[end] == 0) queue.push(end);
  }
}

console.log(answer.join("\n"));
