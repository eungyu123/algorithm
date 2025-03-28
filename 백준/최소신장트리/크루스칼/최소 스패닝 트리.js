const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);
const arr = new Array(V + 1).fill(-1);
const edges = input.slice(1).map((v) => v.trim().split(" ").map(Number));
edges.sort((a, b) => a[2] - b[2]);
let answer = 0;
function find(x) {
  if (arr[x] < 0) return x;
  return (arr[x] = find(arr[x]));
}

function isDifferentGroup(u_, v_, weight) {
  let u = find(u_);
  let v = find(v_);
  if (u == v) return false;

  if (arr[u] == arr[v]) arr[v]--;

  if (arr[u] < arr[v]) arr[v] = u;
  else arr[u] = v;

  answer += weight;
  return true;
}

for (let [start, end, weight] of edges) {
  isDifferentGroup(start, end, weight);
}

console.log(answer);
