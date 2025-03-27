const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [n, m, r] = input.shift().split(" ").map(Number);
console.log(n, m, r);

const values = input.shift().split(" ").map(Number);
console.log(values);

const graph = Array(n + 1)
  .fill(0)
  .map(() => Array(n + 1).fill(0));

console.table(graph);

// 애니메이션
