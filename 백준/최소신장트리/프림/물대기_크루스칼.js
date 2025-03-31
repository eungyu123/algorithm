class UnionFind {
  constructor(arr = []) {
    this.arr = Array(arr.length + 1).fill(-1);
  }

  find(x) {
    if (this.arr[x] < 0) return x;
    return (this.arr[x] = this.find(this.arr[x]));
  }

  union(x, y) {
    const parentX = this.find(x);
    const parentY = this.find(y);

    if (parentX == parentY) return false;

    if (this.arr[parentX] < this.arr[parentY]) {
      this.arr[parentY] = parentX;
    } else if (this.arr[parentX] == this.arr[parentY]) {
      this.arr[parentX] = parentY;
      this.arr[parentY] -= 1;
    } else {
      this.arr[parentX] = parentY;
    }

    return true;
  }
}

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let idx = 0;
const N = Number(input[idx++]);

const Vertexes = Array(N);
for (let i = 0; i < N; i++) {
  Vertexes[i] = Number(input[idx++]);
}
Vertexes.push(0);

const graph = [];

for (let i = 0; i < N; i++) {
  const edge = input[idx++].split(" ").map(Number);
  edge.push(Vertexes[i]);

  graph.push(edge);
}
graph.push(Vertexes);

const edges = [];
for (let i = 0; i < N + 1; i++) {
  for (let j = 0; j < N + 1; j++) {
    if (graph[i][j] != 0) {
      edges.push([i, j, graph[i][j]]);
    }
  }
}

edges.sort((a, b) => a[2] - b[2]);
const unionFind = new UnionFind(Vertexes);
let totalWeight = 0;

for (let i = 0; i < edges.length; i++) {
  const startParent = unionFind.find(edges[i][0]);
  const endParent = unionFind.find(edges[i][1]);

  if (startParent == endParent) continue;

  unionFind.union(edges[i][0], edges[i][1]);
  totalWeight += edges[i][2];
}

console.log(totalWeight);
