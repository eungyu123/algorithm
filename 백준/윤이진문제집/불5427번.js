const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const testCase = input.shift();
let testCaseIndex = 0;
for (let i = 0; i < testCase; i++) {
  const [N, M] = input[testCaseIndex].trim().split(" ").map(Number);
  testCaseIndex++;

  const graph = [];
  for (let j = 0; j < M; j++) {
    const nextLine = input[testCaseIndex].trim().split("");
    graph.push(nextLine);
    testCaseIndex++;
  }

  const answer = bfs(graph, N, M);
  if (answer) console.log(answer);
  else console.log("IMPOSSIBLE");
}

//prettier-ignore
function bfs(arr, N, M) {
  const fire = []; 
  const direction = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  let people;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] == "*") fire.push([i, j]);
      if (arr[i][j] == "@") people = [i, j, 1];
    }
  }

  const visited = Array(M).fill(0).map(() => Array(N).fill(Infinity)) 
  let currentLevel = 1;
  const queue = [];
  queue.push(people);

  while (queue.length > 0) {
    const [cy, cx, level] = queue.shift();
    if( cy == 0 || cx == 0 || cy == M - 1 || cx == N - 1) {
        return level;
    }

    if (currentLevel == level) {
        currentLevel = level + 1;
        let fireSize = fire.length; 
        const newFire = []; // 🔥 새로운 불의 위치를 저장할 배열
    
        for (let j = 0; j < fireSize; j++) {
            const [fy, fx] = fire[j]; // 기존 불 위치 꺼내기
    
            for (let [dy, dx] of direction) {
                const ny = fy + dy;
                const nx = fx + dx;
                if (ny < 0 || ny >= M || nx < 0 || nx >= N) continue; // 범위 벗어나면 패스
    
                if (arr[ny][nx] === "." || arr[ny][nx] === "@") {
                    arr[ny][nx] = "*"; // 불이 번짐
                    newFire.push([ny, nx]); // 새로운 불 위치 저장
                }
            }
        }
        
        fire.length = 0; // 기존 fire 배열 초기화
        fire.push(...newFire); // 새로운 불 배열을 다시 fire에 넣음
    }
    
    
    for (let dir of direction) {
        const ny = cy + dir[0];
        const nx = cx + dir[1]; 
        if( ny < 0 || ny >= M || nx < 0 || nx >= N) continue; 
        if (visited[ny][nx] > level + 1 && arr[ny][nx] == ".") {
            queue.push([ny, nx, level + 1]); 
            visited[ny][nx] = level + 1;
        }
    }
  }
  return false
}

// 아이디어

// BFS로 풀이

// 1. 불이 번져나갈때 각 초에 따라서 불의 번짐 정도는 같음
// 2. 사람의 위치는 다 다를 수 있음
// 3. 각 사람의 위치를 시간초에 따라 기록하고 불의 번짐과 비교하여 출구를 찾음
// 4. BFS 방식을 사용할떄 사람의 위치에 레벨을 기록했을떄 레벨이 바뀔때만 graph의 불을 번지게 하면됨
// 5. 불이 번졌을때 그 레벨에서의 사람들의 위치를 계산 -> 이미 방문한경우를 체크하여 이전레벨또는 같은레벨에서 방문했다면 그것은삭제

// 상세 풀이
// 불이 번져나갈때 불의 위치를 배열로 저장 [y, x, 방향]
// 배열을 순환하면서 추가해야할 불이 이미 있다면 넘기기, 없다면 graph에 추가, fire에 추가, 자기 자신업데이트
//
