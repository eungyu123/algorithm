const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// N 정점, M 선, K 최단거리, X 시작점
const [N, M, K, X] = input.shift().split(" ").map(Number);
// prettier-ignore
const graph = Array.from({length: N + 1}, () => []);
for (let i = 0; i < M; i++) {
  const [start, end] = input[i].split(" ").map(Number);
  graph[start].push(end);
}

const distanceFromX = Array(N + 1).fill(Infinity);
distanceFromX[X] = 0;

function dijkstra() {
  let queue = [X];

  while (queue.length > 0) {
    const current = queue.shift();

    for (let nextNode of graph[current]) {
      if (1 + distanceFromX[current] < distanceFromX[nextNode]) {
        distanceFromX[nextNode] = 1 + distanceFromX[current];
        queue.push(nextNode);
      }
    }
  }

  return distanceFromX;
}

dijkstra();

const answer = [];
for (let i = 0; i < distanceFromX.length; i++) {
  if (distanceFromX[i] == K) answer.push(i);
}
if (answer.length == 0) console.log(-1);
else answer.forEach((v, i) => console.log(v));

// 첫 풀이
// const fs = require("fs");
// const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// const [N, M, K, X] = input.shift().split(" ").map(Number);
// // N 정점, M 선, K 최단거리, X 시작점
// // prettier-ignore
// const graph = Array(N + 1).fill(0).map( () => Array(N + 1).fill(0) );
// for (let i = 0; i < M; i++) {
//   const [start, end] = input[i].split(" ").map(Number);
//   graph[start][end] = 1;
// }
// const distanceFromX = Array(N + 1).fill(Infinity);
// const visitedFromX = Array(N + 1).fill(false);

// const result = dijkstra();
// const answer = result.map((v, i) => {
//   if (v == K) {
//     return i;
//   } else {
//     return 0;
//   }
// });
// if (answer.reduce((prev, curr) => prev + curr) == 0) console.log(-1);
// // 다익스트라 알고리즘 - 하나의 정점에서 다른 모든 정점까지의 최단거리를 구하는 알고리즘
// else {
//   answer.forEach((v, i) => {
//     if (v != 0) console.log(v);
//   });
// }
// function dijkstra() {
//   let start = X;
//   for (let i = 1; i <= N; i++) {
//     if (graph[start][i]) {
//       distanceFromX[i] = 1;
//     }
//   }
//   visitedFromX[start] = true;

//   while (true) {
//     if (visitedFromX.filter((v) => v == false).length == 1)
//       return distanceFromX;

//     let minValue = Infinity;
//     let nextStart = 0;
//     for (let i = 1; i <= N; i++) {
//       if (
//         !visitedFromX[i] &&
//         distanceFromX[i] != Infinity &&
//         distanceFromX[i] < minValue
//       ) {
//         minValue = distanceFromX[i];
//         nextStart = i;
//       }
//     }
//     visitedFromX[nextStart] = true;

//     for (let i = 1; i <= N; i++) {
//       if (
//         graph[nextStart][i] &&
//         graph[nextStart][i] + distanceFromX[nextStart] < distanceFromX[i]
//       ) {
//         distanceFromX[i] = graph[nextStart][i] + distanceFromX[nextStart];
//       }
//     }
//   }
// }

// 우선순위 큐 (GPT)
// const fs = require("fs");
// const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

// const [N, M, K, X] = input.shift().split(" ").map(Number);

// // 인접 리스트 생성
// const graph = Array.from({ length: N + 1 }, () => []);

// for (let i = 0; i < M; i++) {
//   const [start, end] = input[i].split(" ").map(Number);
//   graph[start].push(end);
// }

// function dijkstra(start) {
//   const distance = Array(N + 1).fill(Infinity);
//   distance[start] = 0;

//   // 우선순위 큐 (최소 힙) 사용
//   const pq = [[0, start]]; // [거리, 노드]

//   while (pq.length > 0) {
//     // 거리 기준으로 오름차순 정렬 후 최소값 추출
//     pq.sort((a, b) => a[0] - b[0]);
//     const [dist, node] = pq.shift();

//     // 이미 처리된 노드는 무시
//     if (dist > distance[node]) continue;

//     for (const next of graph[node]) {
//       const newDist = distance[node] + 1;
//       if (newDist < distance[next]) {
//         distance[next] = newDist;
//         pq.push([newDist, next]);
//       }
//     }
//   }
//   return distance;
// }

// const result = dijkstra(X);
// const answer = [];

// for (let i = 1; i <= N; i++) {
//   if (result[i] === K) answer.push(i);
// }

// if (answer.length === 0) console.log(-1);
// else console.log(answer.join("\n"));
