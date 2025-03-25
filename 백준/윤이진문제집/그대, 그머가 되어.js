const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [a, b] = input.shift().split(" ").map(Number);
const [N, M] = input.shift().split(" ").map(Number);

const graph = {};

for (let i = 0; i < M; i++) {
  const [start, end] = input[i].trim().split(" ").map(Number);

  if (graph[start]) graph[start].push(end);
  else {
    graph[start] = [end];
  }

  if (graph[end]) graph[end].push(start);
  else {
    graph[end] = [start];
  }
}
function bfs(graph, start) {
  const queue = [[start, 0]];
  const visited = Array(N + 1).fill(Infinity);

  while (queue.length > 0) {
    const [current, level] = queue.shift();

    if (current == b) return level;

    for (let nextNode of graph[current]) {
      if (visited[nextNode] > level + 1) {
        visited[nextNode] = level + 1;
        queue.push([nextNode, level + 1]);
      }
    }
  }
  return -1;
}

const answer = bfs(graph, a);
console.log(answer);
