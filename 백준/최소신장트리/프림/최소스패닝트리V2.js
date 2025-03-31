class MinHeap {
  constructor() {
    this.heap = [];
  }

  enqueue(cost, a, b) {
    this.heap.push([cost, a, b]);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index][0] >= this.heap[parentIndex][0]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return minValue;
  }

  bubbleDown() {
    let index = 0;
    while (true) {
      let leftIndex = 2 * index + 1;
      let rightIndex = 2 * index + 2;
      let minIndex = index;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex][0] < this.heap[minIndex][0]
      ) {
        minIndex = leftIndex;
      }
      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex][0] < this.heap[minIndex][0]
      ) {
        minIndex = rightIndex;
      }
      if (minIndex === index) break;
      this.swap(index, minIndex);
      index = minIndex;
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [V, E] = input.shift().split(" ").map(Number);
const adj = Array.from({ length: V + 1 }, () => []);

for (let i = 0; i < E; i++) {
  const [a, b, cost] = input[i].split(" ").map(Number);
  adj[a].push([cost, b]);
  adj[b].push([cost, a]);
}

const chk = Array(V + 1).fill(false);
const pq = new MinHeap();
chk[1] = true;
for (const [cost, b] of adj[1]) {
  pq.enqueue(cost, 1, b);
}

let cnt = 0,
  ans = 0;
while (cnt < V - 1) {
  const edge = pq.dequeue();
  if (!edge) break;
  const [cost, a, b] = edge;
  if (chk[b]) continue;
  ans += cost;
  chk[b] = true;
  cnt++;
  for (const [nextCost, nextB] of adj[b]) {
    if (!chk[nextB]) pq.enqueue(nextCost, b, nextB);
  }
}

console.log(ans);
