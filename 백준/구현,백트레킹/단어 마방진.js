const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

let inputIdx = 0;
const [L, M] = input[inputIdx++].split(" ").map(Number);
const words = [];
for (let i = 0; i < M; i++) {
  words.push(input[inputIdx++].trim().split(""));
}

function isMagicSquare(arr) {
  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      if (arr[i][j] !== arr[j][i]) return false; // 새로운 배열 만들지 않고 직접 비교
    }
  }
  return true;
}

const newArr = Array(L)
  .fill()
  .map(() => []);
const visited = Array(L).fill(false);
let answer;

function backTracking(newArr, step) {
  if (step == L) {
    // 문자열 비교시 유니코드로 변환하여 비교함, 또는 charCodeAt 으로 유니코드 얻고 비교 가능
    if (isMagicSquare(newArr) && (!answer || newArr[0][0] < answer[0][0])) {
      // 깊은 복사
      answer = [...newArr];
    }
    return;
  }

  for (let i = 0; i < M; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    newArr[step] = words[i];
    backTracking(newArr, step + 1);
    visited[i] = false;
  }
}

backTracking(newArr, 0);

if (answer) {
  const answerStr = answer.map((v) => v.join("")).join("\n");
  console.log(answerStr);
} else {
  console.log("NONE");
}

// 새로운 배열 만들어서 할때 사용했던 함수
function areMatricesEqual(a, b) {
  // JSON.stringify(arr) == JSON.stringify(newArr)는 작동하지만, 문자열 변환과정에서 효율적이지 않음
  return a.every((row, i) => row.every((val, j) => val === b[i][j]));
}
