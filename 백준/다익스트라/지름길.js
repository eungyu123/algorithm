const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [N, D] = input.shift().split(" ").map(Number);

const graph = Array.from({ length: D + 1 }, () => []); // start, end

for (let i = 0; i < N; i++) {
  const [start, end, distance] = input[i].split(" ").map(Number);
  if (distance < end - start && end <= D) {
    graph[start].push([end, distance]);
  }
}

for (let i = 0; i < D; i++) {
  graph[i].push([i + 1, 1]);
}
const distanceFromStart = Array(10000 + 1).fill(Infinity);
distanceFromStart[0] = 0;

dijkstra();
console.log(distanceFromStart[D]);

function dijkstra() {
  const visited = Array(D + 1).fill(false);

  while (true) {
    let minValue = Infinity;
    let currentNode = -1;

    for (let i = 0; i <= D; i++) {
      if (!visited[i] && distanceFromStart[i] < minValue) {
        minValue = distanceFromStart[i];
        currentNode = i;
      }
    }

    if (currentNode == -1) break;

    visited[currentNode] = true;

    for (let [next, weight] of graph[currentNode]) {
      if (distanceFromStart[currentNode] + weight < distanceFromStart[next]) {
        distanceFromStart[next] = distanceFromStart[currentNode] + weight;
      }
    }
  }
}

// 특정 위치에서 노드 검색
// 노드가 없다면 다음 위치로 이동 (현재 자신보다 큰 지름길의 시작점과 마지막 지점)
// 노드가 있다면 제일 가까운 그 노드로 이동
