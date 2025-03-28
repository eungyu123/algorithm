class MinHeap {
  constructor() {
    this.heap = [];
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  enqueue(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      this.swap(parentIndex, index);
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
    const length = this.heap.length;

    while (true) {
      let leftIndex = 2 * index + 1;
      let rightIndex = 2 * index + 2;
      let smallest = index;

      if (leftIndex < length && this.heap[leftIndex] < this.heap[smallest]) {
        smallest = leftIndex;
      }
      if (rightIndex < length && this.heap[rightIndex] < this.heap[smallest]) {
        smallest = rightIndex;
      }
      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
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
