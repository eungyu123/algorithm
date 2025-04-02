const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const N = Number(input[inputIdx++]);
const names = input[inputIdx++].trim().split(" ").sort();
const namesObj = {};

for (let i = 0; i < names.length; i++) {
  namesObj[names[i]] = i;
}

const adj = Array(N)
  .fill()
  .map(() => []);
const inDegree = Array(N).fill(0);
const queue = [];

const M = Number(input[inputIdx++]);

for (let i = 0; i < M; i++) {
  const [descendant, ancestor] = input[inputIdx++].trim().split(" ");
  inDegree[namesObj[descendant]]++;
  adj[namesObj[ancestor]].push(namesObj[descendant]);
}

const ancestors = [];
const answer = Array(N)
  .fill()
  .map(() => []);

for (let i = 0; i < N; i++) {
  if (inDegree[i] == 0) {
    ancestors.push(names[i]);
    queue.push(i);
  }
}

while (queue.length > 0) {
  const shiftedIdx = queue.shift();
  for (let idx of adj[shiftedIdx]) {
    inDegree[idx]--;
    if (inDegree[idx] == 0) {
      queue.push(idx);
      answer[shiftedIdx].push(names[idx]);
    }
  }
}

console.log(ancestors.length);
console.log(ancestors.sort().join(" "));
for (let i = 0; i < answer.length; i++) {
  console.log(names[i], answer[i].length, answer[i].sort().join(" "));
}
