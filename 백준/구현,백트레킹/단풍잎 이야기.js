const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [n, m, k] = input.shift().split(" ").map(Number);
const quests = input.map((line) => line.split(" ").map(Number));

// 이렇게 하면 틀리는데 이유는 모르곘음
// const keySet = new Set();
// quests.forEach((line) => {
//   line.forEach((v, i) => {
//     if (v > 0 && v <= 2 * n) keySet.add(v);
//   });
// });
// const keyArr = Array.from(keySet);

const keyArr = Array.from({ length: 2 * n }, (_, i) => i + 1);
let answer = -Infinity;

function combine(start, arr) {
  if (arr.length == n) {
    answer = Math.max(answer, test(arr));
    return;
  }

  for (let i = start; i < keyArr.length; i++) {
    combine(i + 1, [...arr, keyArr[i]]);
  }
}
function test(arr) {
  const set = new Set(arr);
  let ctn = 0;
  for (let i = 0; i < m; i++) {
    const skills = quests[i];
    const clear = skills.every((v, i) => set.has(v));
    if (clear) ctn++;
  }
  return ctn;
}

combine(0, []);
console.log(keyArr.length == 0 ? 0 : answer);
