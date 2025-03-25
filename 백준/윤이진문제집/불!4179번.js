const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const graph = [];
for (let i = 0; i < R; i++) {
  const nextLine = input[i].trim().split("");
  graph.push(nextLine);
}
const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const answer = bfs(graph);
console.log(answer);

function bfs(graph) {
  let people;
  let fire = [];

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (graph[i][j] == "J") people = [i, j, 1];
      if (graph[i][j] == "F") fire.push([i, j]);
    }
  }

  const visited = Array(R)
    .fill(0)
    .map(() => Array(C).fill(Infinity));

  const queue = [people];
  let currentLevel = 0;

  while (queue.length > 0) {
    const [cy, cx, level] = queue.shift();
    if (cy == 0 || cy == R - 1 || cx == 0 || cx == C - 1) return level;

    if (currentLevel < level) {
      currentLevel++;
      const newFire = [];
      for (let i = 0; i < fire.length; i++) {
        const [fy, fx] = fire[i];

        for (let dir of direction) {
          const ny = fy + dir[0];
          const nx = fx + dir[1];
          if (ny < 0 || ny >= R || nx < 0 || nx >= C) continue;

          if (["J", "."].includes(graph[ny][nx])) {
            graph[ny][nx] = "F";
            newFire.push([ny, nx]);
          }
        }
      }

      fire.length = 0;
      fire.push(...newFire);
    }

    for (let dir of direction) {
      const ny = cy + dir[0];
      const nx = cx + dir[1];
      if (ny < 0 || ny >= R || nx < 0 || nx >= C) continue;

      if (visited[ny][nx] > level + 1 && graph[ny][nx] == ".") {
        visited[ny][nx] = level + 1;
        queue.push([ny, nx, level + 1]);
      }
    }
  }

  return "IMPOSSIBLE";
}
