const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const [N, MaxTime] = input.shift().split(" ").map(Number);

const DP = Array(MaxTime + 1).fill(0);

for (let i = 0; i < N; i++) {
  const [time, score] = input[i].split(" ").map(Number);

  for (let j = MaxTime; j >= time; j--) {
    DP[j] = Math.max(DP[j], DP[j - time] + score);
  }
}

console.log(Math.max(...DP));
