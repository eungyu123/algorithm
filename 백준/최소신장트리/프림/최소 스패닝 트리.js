class MinHeap {
  constructor() {
    this.heap = [];
  }

  enqueue(start, end, x) {
    this.heap.push([start, end, x]);
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
  // prettier-ignore
  bubbleDown() {
      const heapLen = this.heap.length;
      let leftIndex, rightIndex;
      let index = 0;
      let minValueIndex;
  
      while (index < heapLen) {
        leftIndex = index * 2 + 1;
        rightIndex = index * 2 + 2;
        minValueIndex = index;
  
        if (leftIndex < heapLen &&  this.heap[leftIndex][2] < this.heap[minValueIndex][2]) {
          minValueIndex = leftIndex;
        }
  
        if (rightIndex < heapLen &&  this.heap[rightIndex][2] < this.heap[minValueIndex][2]) {
          minValueIndex = rightIndex;
        }
  
        if(minValueIndex == index) break;  
        this.swap(index, minValueIndex);
        index = minValueIndex;    
      }
    }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }
}

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [V, E] = input.shift().split(" ").map(Number);

const graph = Array(V + 1)
  .fill(0)
  .map(() => Array(0));

for (let i = 0; i < E; i++) {
  const [A, B, C] = input[i].split(" ").map(Number);
  graph[A].push([B, C]);
  graph[B].push([A, C]);
}

const minHeap = new MinHeap();
const visited = Array(V + 1).fill(false);
let totalWeight = 0;

visited[1] = true;
graph[1].forEach(([end, weight]) => {
  minHeap.enqueue(1, end, weight);
});

let edgeCount = 0;
while (edgeCount < V - 1) {
  const [start, end, weight] = minHeap.dequeue();
  if (start === null || end === null || weight === null) break;
  if (visited[end]) continue;

  visited[end] = true;
  totalWeight += weight;
  edgeCount++;

  graph[end].forEach(([neighbor, weight]) => {
    if (!visited[neighbor]) {
      minHeap.enqueue(end, neighbor, weight);
    }
  });
}

console.log(totalWeight);
// 프림 알고리즘 - 크루스칼 알고리즘과 마찬가지고 그리디 알고리즘
// 1. 임의의 정점을 선택해 최소 신장트리에 추가
// 2. 최소 신장 트리에 포함된 정점과 최소 신장트리에 포함되지 않은 정점을 연결하는
// 간선 중 비용이 가장 작은 것을 최소 신장 트리에 추가
// 3. 최소 신장 트리에 V-1개의 간선이 추가될 때 까지 2번 과정을 반복

// 프림 알고리즘
// 1. 임의의 정점을 선택해 최소 신장 트리에 추가, 해당 정점과 연결된 모든 간선을 우선순위 큐에 추가
// 2. 우선순위 큐에서 비용이 가장 작은 간선을 선택
// 3. 만약 해당 간선이 최소 신장 트리에 포함된 두 정점을 연결한다면 아무것도 하지 않고 넘어감
// 해당 간선이 최소 신장 트리에 포함된 정점 u와 포함되지 않은 정점 v를 연결한다면 해당 간선과 정점v를
// 최소 신장 트리에 추가 후 정점 v와 최소 신장 트리에 포함되지 않는 정점을 연결하는 모든 간선을 우선순위 큐에 추가
// 4. 최소 신장 트리에 V-1개의 간선이 추가될 때 까지 2,3번 과정을 반복
