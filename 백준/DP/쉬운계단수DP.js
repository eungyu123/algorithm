const fs = require("fs");
const N = Number(fs.readFileSync("input.txt").toString().trim());

const MOD = 1000000000;

// DP 테이블 초기화
const dp = Array.from(Array(N + 1), () => Array(10).fill(0));

// 길이가 1일 때 (1~9는 1개씩, 0은 포함 X)
for (let i = 1; i <= 9; i++) {
  dp[1][i] = 1;
}

// DP 점화식 적용
for (let i = 2; i <= N; i++) {
  for (let j = 0; j <= 9; j++) {
    if (j === 0) dp[i][j] = dp[i - 1][1] % MOD;
    else if (j === 9) dp[i][j] = dp[i - 1][8] % MOD;
    else dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % MOD;
  }
}

// 결과 계산
let result = dp[N].reduce((sum, val) => (sum + val) % MOD, 0);
console.log(result);
