const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [N, D] = input.shift().split(" ").map(Number);
const graph = Array.from({ length: D + 1 }, () => []);

// 지름길 입력
for (let i = 0; i < N; i++) {
  const [start, end, distance] = input[i].split(" ").map(Number);
  if (end <= D && distance < end - start) {
    graph[start].push([end, distance]);
  }
}

// 일반 도로 연결 (1칸씩 이동하는 경우)
for (let i = 0; i < D; i++) {
  graph[i].push([i + 1, 1]);
}

// 최단 거리 배열 (Infinity 초기화)
const distanceFromStart = Array(D + 1).fill(Infinity);
distanceFromStart[0] = 0;

dijkstra();
console.log(distanceFromStart[D]);

function dijkstra() {
  const visited = Array(D + 1).fill(false);

  while (true) {
    let minDistance = Infinity;
    let currentNode = -1;

    // 방문하지 않은 노드 중에서 최단 거리 찾기
    for (let i = 0; i <= D; i++) {
      if (!visited[i] && distanceFromStart[i] < minDistance) {
        minDistance = distanceFromStart[i];
        currentNode = i;
      }
    }

    // 모든 노드가 방문된 경우 종료
    if (currentNode === -1) break;

    visited[currentNode] = true;

    // 현재 노드에서 갈 수 있는 모든 경로 업데이트
    for (const [next, weight] of graph[currentNode]) {
      if (distanceFromStart[currentNode] + weight < distanceFromStart[next]) {
        distanceFromStart[next] = distanceFromStart[currentNode] + weight;
      }
    }
  }
}
