const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const N = Number(input.shift());
const arr = input.shift().split(" ").map(Number);

const sequence = [];

for (let num of arr) {
  console.log(sequence);
  let left = 0;
  let right = sequence.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (sequence[mid] < num) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  if (left < sequence.length) {
    sequence[left] = num;
  } else {
    sequence.push(num);
  }
}

console.log(sequence.length);
