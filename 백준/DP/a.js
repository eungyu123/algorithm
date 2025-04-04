const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [N, MaxTime] = input.shift().split(" ").map(Number);

const problems = input.map((line) => line.split(" ").map(Number));

const DP = Array(MaxTime + 1).fill(0);
for (let i = 0; i < N; i++) {
  const [time, score] = problems[i];

  for (let t = MaxTime; t >= time; t--) {
    DP[t] = Math.max(DP[t], DP[t - time] + score);
  }
}

const answer = Math.max(...DP);
console.log(answer);
console.table(DP);
