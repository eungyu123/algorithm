class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(x, y) {
    return ([this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]]);
  }

  isEmpty(x) {
    return this.heap.length == 0;
  }

  enqueue(x) {
    this.heap.push(x);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);

    while (index > 0) {
      if (this.heap[index] >= this.heap[parentIndex]) break;
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
    let index = 0;
    let leftIndex, rightIndex;
    const length = this.heap.length;

    while (true) {
      leftIndex = 2 * index + 1;
      rightIndex = 2 * index + 2;
      let minIndex = index;
      if (leftIndex < length && this.heap[leftIndex] < this.heap[minIndex]) {
        minIndex = leftIndex;
      }
      if (rightIndex < length && this.heap[rightIndex] < this.heap[minIndex]) {
        minIndex = rightIndex;
      }

      if (minIndex == index) break;
      this.swap(index, minIndex);
      index = minIndex;
    }
  }
}
const pq = new MinHeap();

pq.enqueue(5);
pq.enqueue(2);
pq.enqueue(8);
pq.enqueue(3);
pq.enqueue(1);

console.log(pq.dequeue()); // 1
console.log(pq.dequeue()); // 2
console.log(pq.dequeue()); // 3
console.log(pq.dequeue()); // 5
console.log(pq.dequeue()); // 8
