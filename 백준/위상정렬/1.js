const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const N = Number(input[inputIdx++]);
const names = input[inputIdx++].trim().split(" ").sort();
const namesObj = {};

for (let i = 0; i < names.length; i++) {
  namesObj[names[i]] = i + 1;
}

const M = Number(input[inputIdx++]);
const graph = Array.from({ length: N + 1 }, () => []);
const inDegree = Array(N + 1).fill(0);

for (let i = 0; i < M; i++) {
  const [descendant, ancestor] = input[inputIdx++].trim().split(" ");
  graph[namesObj[descendant]].push(namesObj[ancestor]);
  inDegree[namesObj[ancestor]]++;
}

const res = Array.from({ length: N + 1 }, () => []);
const ans = [];
const queue = [];

for (let i = 1; i <= N; i++) {
  if (graph[i].length === 0) ans.push(names[i - 1]);
  if (inDegree[i] === 0) queue.push(i);
}

while (queue.length > 0) {
  const x = queue.shift();
  if (graph[x].length === 1) {
    res[graph[x][0]].push(names[x - 1]);
  } else {
    for (let p of graph[x]) {
      inDegree[p]--;
      if (inDegree[p] === 0) {
        res[p].push(names[x - 1]);
        queue.push(p);
      }
    }
  }
}

console.log(ans.length);
console.log(ans.join(" "));
for (let i = 1; i <= N; i++) {
  console.log(names[i - 1], res[i].length, res[i].sort().join(" "));
}
