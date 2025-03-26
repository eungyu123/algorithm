const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [start, end, distance] = input[i].split(" ").map(Number);
  graph[start].push([end, distance]);
  graph[end].push([start, distance]);
}

const answer = dijkstra();
console.log(answer[N]);
function dijkstra() {
  const distanceFromStart = Array(N + 1).fill(Infinity);
  distanceFromStart[0] = 0;
  distanceFromStart[1] = 0;
  const visitedFromStart = Array(N + 1).fill(false);

  while (true) {
    let currentNode = -1;
    let minDistance = Infinity;

    for (let i = 1; i <= N; i++) {
      if (!visitedFromStart[i] && distanceFromStart[i] < minDistance) {
        minDistance = distanceFromStart[i];
        currentNode = i;
      }
    }

    if (currentNode == -1) return distanceFromStart;
    visitedFromStart[currentNode] = true;

    for (let [nextNode, weight] of graph[currentNode]) {
      if (
        distanceFromStart[currentNode] + weight <
        distanceFromStart[nextNode]
      ) {
        distanceFromStart[nextNode] = distanceFromStart[currentNode] + weight;
      }
    }
  }
}
