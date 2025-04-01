//
// 위상정렬
// 주어진 방향그래프에서 순서를 위배하지 않고 나열하는 정렬
// 사이클이 존재해서는 안됨 -> A->B->C->A 의 경우 어떤것이 먼저 나오더라도 에러가 생김
//
// 성질
// 1. 정점과 간선을 실제로 지울 필요없이 미리 indegree의 값을 저장했다가 매번 뻗어나가는
// 정점들의 indegree값만 1감소 시켜도 과정 수행 가능
// 2. indegree가 0d인 정점을 구하기 위해 모든 정점들을 다 확인하는 대신 목록을 따로
// 저장하고 있다가 직전에 제거한 정점에서 연결된 정점들만 추가

// 위상 정렬 알고리즘
// 1. 맨 처음 모든 간선을 읽으며 indegree테이블을 채움
// 2. indegree가 0 인 정점들을 모두 큐에 넣음
// 3. 큐에서 정점을 꺼내어 위상정렬 결과에 추가
// 4. 해당 정점으로부터 연결된 모든 정점의 indegree값을 1감소시킴
// 이 때 indegree가 0이 되었다면 그 정점을 큐에 추가
// 5. 큐가 빌 때까지 3,4번 과정을 반복

const graph = [
  [0, 1],
  [2, 1],
  [2, 3],
  [3, 1],
];

const n = 4; // 노드 개수
const adjList = Array.from({ length: n }, () => []);
const inDegree = new Array(n).fill(0);

// 그래프 인접 리스트 및 진입 차수 배열 구성
graph.forEach(([from, to]) => {
  adjList[from].push(to);
  inDegree[to] += 1;
});

// 위상 정렬 (Kahn's Algorithm: BFS 방식)
const queue = [];
for (let i = 0; i < n; i++) {
  if (inDegree[i] === 0) queue.push(i);
}

const topologicalOrder = [];
while (queue.length > 0) {
  const node = queue.shift();
  topologicalOrder.push(node);

  for (const neighbor of adjList[node]) {
    inDegree[neighbor] -= 1;
    if (inDegree[neighbor] === 0) queue.push(neighbor);
  }
}

console.log("위상 정렬 결과:", topologicalOrder);
