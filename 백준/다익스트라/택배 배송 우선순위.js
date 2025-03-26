// 최소 힙 구현
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this._bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  _bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < length &&
        this.heap[leftChild][0] < this.heap[smallest][0]
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < length &&
        this.heap[rightChild][0] < this.heap[smallest][0]
      ) {
        smallest = rightChild;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [start, end, distance] = input[i].split(" ").map(Number);
  graph[start].push([end, distance]);
  graph[end].push([start, distance]);
}

console.log(dijkstra(1, N));

function dijkstra(start, end) {
  const distance = Array(N + 1).fill(Infinity);
  const pq = new MinHeap(); // 최소 힙(우선순위 큐) 사용

  distance[start] = 0;
  pq.push([0, start]); // [거리, 노드]

  while (!pq.isEmpty()) {
    const [dist, current] = pq.pop();

    if (distance[current] < dist) continue; // 이미 더 작은 값이 갱신된 경우 무시

    for (const [next, weight] of graph[current]) {
      const newDist = dist + weight;
      if (newDist < distance[next]) {
        distance[next] = newDist;
        pq.push([newDist, next]);
      }
    }
  }
  return distance[end];
}
