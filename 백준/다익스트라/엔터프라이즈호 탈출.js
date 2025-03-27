const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const testCase = Number(input.shift());

let inputIndex = 0;

for (let i = 0; i < testCase; i++) {
  const [K, W, H] = input[inputIndex++].split(" ").map(Number);

  const timeObj = {};
  for (let j = 0; j < K; j++) {
    //prettier-ignore
    const [node, time] = input[inputIndex++].trim().split(" ")
    timeObj[node] = Number(time);
  }

  const graph = [];
  for (let j = 0; j < H; j++) {
    const line = input[inputIndex++].trim().split("");
    graph.push(line);
  }
}

function dijkstra(graph, H, W) {
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {}
  }
}
