const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const [N, MaxTime] = input.shift().split(" ").map(Number);

const DP = Array(N)
  .fill()
  .map(() => Array(2).fill(0)); // [현재까지 걸린 시간, 현재까지 최대값]

for (let i = 0; i < N; i++) {
  const [time, score] = input[i].split(" ").map(Number);

  // 앞에서부터 하면 안되는 이유
  // 딱 I라는 지점에서 최대값을 지정했을때 다른조합을 확인할 수 없음
  // 즉 현 지점에서 최대값이 나중에도 최대값을 보장하라는 증거가 없음
  // 그래서 뒤에서 적용한다면 계속 현 시점에서 최고의 조합을 알아낼수 있음
  if (time <= MaxTime) {
    DP[i] = [time, score];
  }

  for (let j = 0; j < i; j++) {
    const newTime = DP[j][0] + time;
    const newScore = DP[j][1] + score;
    if (MaxTime < newTime) continue;

    if (DP[i][1] < newScore) {
      DP[i] = [newTime, newScore];
    }
  }
}

const answer = DP.reduce((prev, curr) => {
  if (prev < curr[1]) return curr[1];
  else return prev;
}, 0);

console.log(answer);
console.table(DP);
