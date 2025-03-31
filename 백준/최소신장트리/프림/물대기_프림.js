class MinHeap {
  constructor() {
    this.heap = [];
  }

  enqueue(start, end, weight) {
    this.heap.push([start, end, weight]);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (index > 0 && this.heap[index][2] < this.heap[parentIndex][2]) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  dequeue() {
    if (this.heap.length == 0) return null;
    if (this.heap.length == 1) return this.heap.pop();
    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return minValue;
  }

  bubbleDown() {
    const heapLen = this.heap.length;
    let index = 0;

    while (index < heapLen) {
      let leftIndex = index * 2 + 1;
      let rightIndex = index * 2 + 2;
      let minIndex = index;

      if (
        leftIndex < heapLen &&
        this.heap[leftIndex][2] < this.heap[minIndex][2]
      ) {
        minIndex = leftIndex;
      }

      if (
        rightIndex < heapLen &&
        this.heap[rightIndex][2] < this.heap[minIndex][2]
      ) {
        minIndex = rightIndex;
      }

      if (index == minIndex) break;
      this.swap(index, minIndex);
      index = minIndex;
    }
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }
}

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let idx = 0;
const N = Number(input[idx++]);
const Vertexes = [];

for (let i = 0; i < N; i++) {
  const vertex = Number(input[idx++]);
  Vertexes.push(vertex);
}
Vertexes.push(0);

const graph = [];
for (let i = 0; i < N; i++) {
  const edge = input[idx++].split(" ").map(Number);
  edge.push(Vertexes[i]);
  graph.push(edge);
}
graph.push(Vertexes);

const visited = Array(N + 1).fill(false);
const minHeap = new MinHeap();
let totalWeight = 0;
visited[0] = true;

graph[0].forEach((weight, end) => {
  if (weight != 0) minHeap.enqueue(0, end, weight);
});
let edgeCount = 0;
while (edgeCount < N) {
  const edge = minHeap.dequeue();
  if (!edge) break;
  const [start, end, weight] = edge;
  if (visited[end]) continue;
  visited[end] = true;
  totalWeight += weight;
  edgeCount++;
  graph[end].forEach((weight, neighbor) => {
    if (weight !== 0 && !visited[neighbor]) {
      minHeap.enqueue(end, neighbor, weight);
    }
  });
}
console.log(totalWeight);
