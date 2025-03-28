const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const [V, E] = input.shift().split(" ").map(Number);
const arr = new Array(V + 1).fill(-1);

function find(x) {
  if (arr[x] < 0) return x;

  return (arr[x] = find(arr[x]));
}

function union(u, v) {
  const parentOfU = find(u);
  const parentOfV = find(v);

  if (parentOfU == parentOfV) return false;

  if (arr[parentOfU] < arr[parentOfV]) {
    arr[parentOfV] = parentOfU;
  } else if (arr[parentOfU] == arr[parentOfV]) {
    arr[parentOfU] = parentOfV;
    arr[parentOfV] -= 1;
  } else {
    arr[parentOfU] = parentOfV;
  }

  return true;
}

const edges = [];
for (let i = 0; i < E; i++) {
  const [start, end, weight] = input[i].split(" ").map(Number);
  edges.push([start, end, weight]);
}
edges.sort((a, b) => {
  return a[2] - b[2];
});

let answer = 0;
for (let i = 0; i < E; i++) {
  const startParent = find(edges[i][0]);
  const endParent = find(edges[i][1]);

  if (startParent == endParent) {
    continue;
  } else {
    union(edges[i][0], edges[i][1]);
    answer += edges[i][2];
  }
}

console.log(answer);
