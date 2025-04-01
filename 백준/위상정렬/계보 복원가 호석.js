const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;

const N = Number(input[inputIdx++]);
const names = input[inputIdx++].trim().split(" ");
const namesObj = {};
for (let i = 0; i < names.length; i++) {
  namesObj[names[i]] = i;
}
const graph = Array(N)
  .fill()
  .map(() => {
    return {};
  });
const M = Number(input[inputIdx++]);

for (let i = 0; i < M; i++) {
  const order = input[inputIdx++].trim().split(" ");
  const startIdx = namesObj[order[0]];
  const endIdx = namesObj[order[1]];
  graph[startIdx][endIdx] = true;
}

console.table(graph);

const inDegree = Array(N)
  .fill()
  .map(() => Array(0));

for (let i = 0; i < N; i++) {
  const next = Object.entries(graph[i]);
  for (let [end, _] of next) {
    end = Number(end);
    if (inDegree[end].length == 0) {
      inDegree[end].push([i, end]);
    } else {
      if (next.length == 2) {
        console.log(inDegree[end][1]);
        delete graph[i][inDegree[end][1]];
      } else {
        inDegree[end].push([i, end]);
      }
    }
  }
}

console.table(graph);
console.table(inDegree);

const answer = {}; // {0: 0, 1:0, 2: 0 ... N:0}
for (let i = 0; i < N; i++) {
  answer[i] = [];
}
// const answer1 = Object.fromEntries(Array.from({ length: N }, (_, i) => [i, 0]));
const queue = [];

for (let i = 0; i < N; i++) {
  if (inDegree[i].length == 0) {
    queue.push(i);
  }
}

// while (queue.length > 0) {
//   const nextNode = queue.shift();

//   for (let [start, end] of graph[nextNode]) {
//     answer[nextNode].push(end);
//     inDegree[nextNode];
//   }
// }aㅁㄴㅇ
