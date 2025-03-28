// 프림 알고리즘 - 크루스칼 알고리즘과 마찬가지고 그리디 알고리즘
// 1. 임의의 정점을 선택해 최소 신장트리에 추가
// 2. 최소 신장 트리에 포함된 정점과 최소 신장트리에 포함되지 않은 정점을 연결하는
// 간선 중 비용이 가장 작은 것을 최소 신장 트리에 추가
// 3. 최소 신장 트리에 V-1개의 간선이 추가될 때 까지 2번 과정을 반복

// 프림 알고리즘
// 1. 임의의 정점을 선택해 최소 신장 트리에 추가, 해당 정점과 연결된 모든 간선을 우선순위 큐에 추가
// 2. 우선순위 큐에서 비용이 가장 작은 간선을 선택
// 3. 만약 해당 간선이 최소 신장 트리에 포함된 두 정점을 연결한다면 아무것도 하지 않고 넘어감
// 해당 간선이 최소 신장 트리에 포함된 정점 u와 포함되지 않은 정점 v를 연결한다면 해당 간선과 정점v를
// 최소 신장 트리에 추가 후 정점 v와 최소 신장 트리에 포함되지 않는 정점을 연결하는 모든 간선을 우선순위 큐에 추가
// 4. 최소 신장 트리에 V-1개의 간선이 추가될 때 까지 2,3번 과정을 반복
