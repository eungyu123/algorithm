const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const N = Number(input.shift());
const arr = input.shift().split(" ").map(Number);

const DP = Array(N).fill(1);
// 각 지점을 반드시 포함시키기
// 각 지점에서 현재 자신의 지점까지 for문을 돌림
// 자신의 값보다 더 큰값이라면 그 지점에서의 길이 + 1을 현재 자신의 길이와 비교
for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] < arr[j]) {
      DP[i] = Math.max(DP[i], DP[j] + 1);
    }
  }
}

console.log(Math.max(...DP));
