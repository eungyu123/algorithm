const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const N = Number(input[0]);
const arr = Array(3).fill(1);
const MOD = 9901;

for (let i = 1; i < N; i++) {
  const [A, B, C] = arr;
  arr[0] = (A + B + C) % MOD;
  arr[1] = (A + C) % MOD;
  arr[2] = (A + B) % MOD;
}

console.log(arr.reduce((prev, curr) => (prev + curr) % MOD));
