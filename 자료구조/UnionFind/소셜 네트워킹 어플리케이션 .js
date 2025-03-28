class UnionFind {
  constructor(arr = []) {
    this.arr = arr;
  }

  find(x) {
    if (this.arr[x] < 0) {
      return x;
    }
    return (this.arr[x] = this.find(this.arr[x]));
  }

  union(X, Y) {
    const parentX = this.find(X);
    const parentY = this.find(Y);

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

const testCase = Number(input[0]);

const answer = [];
let inputIndex = 1;
for (let i = 0; i < testCase; i++) {
  answer.push(`Scenario ${i + 1}:`);
  const userLen = Number(input[inputIndex++].trim());
  const arr = new Array(userLen).fill(-1);
  const unionFind = new UnionFind(arr);

  const unionLen = Number(input[inputIndex++].trim());
  for (let j = 0; j < unionLen; j++) {
    const [X, Y] = input[inputIndex++].trim().split(" ").map(Number);
    unionFind.union(X, Y);
  }

  const findLen = Number(input[inputIndex++].trim());
  for (let j = 0; j < findLen; j++) {
    const [X, Y] = input[inputIndex++].trim().split(" ").map(Number);
    if (unionFind.find(X) == unionFind.find(Y)) {
      answer.push(1);
    } else {
      answer.push(0);
    }
  }
  answer.push("");
}

console.log(answer.join("\n"));
