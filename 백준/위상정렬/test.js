const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const N = Number(input[inputIdx++]);
const names = input[inputIdx++].trim().split(" ");
names.sort(); // 사전순 정렬

const namesObj = {};
names.forEach((name, idx) => (namesObj[name] = idx));

const graph = {};
const inDegree = {};

// 초기화
for (const name of names) {
  graph[name] = [];
  inDegree[name] = 0;
}

const M = Number(input[inputIdx++]);
for (let i = 0; i < M; i++) {
  const [ancestor, descendant] = input[inputIdx++].trim().split(" ");
  graph[ancestor].push(descendant);
  inDegree[descendant]++;
}

// **Step 1: 시조 찾기**
const roots = [];
for (const name of names) {
  if (inDegree[name] === 0) roots.push(name);
}
roots.sort();

console.log(roots.length);
console.log(roots.join(" "));

// **Step 2: 트리 정리**
const result = [];
for (const name of names) {
  graph[name].sort(); // 자식 리스트를 사전순 정렬
  result.push(`${name} ${graph[name].length} ${graph[name].join(" ")}`.trim());
}
console.log(result.join("\n"));
