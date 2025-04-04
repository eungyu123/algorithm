const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim();

const N = Number(input);
const MOD = 1000000000;
// 0 1 2 3 4 5 6 7 8 9
let arr;
for (let i = 0; i < N; i++) {
  if (i == 0) {
    arr = Array(10).fill(1);
    arr[0] = 0;
    continue;
  }

  const newArr = Array(10).fill(0);

  // 중간에 MOD로 안나눠주면 오버플로우 에러발생함
  newArr[0] = arr[1] % MOD;
  for (let j = 1; j < 9; j++) {
    newArr[j] = (arr[j - 1] + arr[j + 1]) % MOD;
  }
  newArr[9] = arr[8] % MOD;

  arr = [...newArr];
}
console.log(
  arr.reduce((prev, curr) => {
    return (prev + curr) % MOD;
  }, 0)
);

// 1 -> 1,2,3,4,5,6,7,8,9
// 2 -> 1,2,3,4,5,6,7,8,9 // 시작
//   -> 2,3,4,5,6,7,8,9,8 // 끝
//   -> 1,2,3,4,5,6,7,8   // 시작
//   -> 0,1,2,3,4,5,6,7   // 끝

// 0 1 2 3 4 5 6 7 8 9
// 0 1 1 1 1 1 1 1 1 1  // 1번
// 1 1 2 2 2 2 2 2 2 1  // 2번
// 1 3 3 4 4 4 4 4 3 2  // 3번
// 2 4 6 7 8 8 8 7 6 3  // 4번

// 이미 만들어진 계단 내부에는 어떤 숫자도 삽입 할 수 없음, 맨앞, 맨뒤만 삽입 가능
// -> 1로 시작한다면 맨끝에만 숫자 삽입 가능
// -> 9로 끝난다면 맨 앞에만 숫자 삽입 가능
// 결론: 뒷쪽으로만 삽입하는 방식으로 확인 (앞 뒤 둘다 삽입하면 겹침 + 0 은 불가능 )
//     : 맨 앞과 맨만 예외
