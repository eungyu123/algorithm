// UnionFind 를 최적화 하기위한 Union By Rank
// Union연산에서 각 그룹의 높이를 비교한 후 더 낮은 높이의 트리를 높이가 더 높은 트리의 자식으로 붙임
// 즉 UNION (높이 5, 높이 3) => 높이 5 정점에 높이 3 트리를 붙임
class UnionFind {
  constructor(arr = []) {
    this.arr = arr;
  }

  find(x) {
    if (this.arr[x] < 0) {
      return x;
    }
    return this.find(this.arr[x]);
  }

  union(u, v) {
    let u_parent = this.find(u);
    let v_parent = this.find(v);
    // 부모가 같다면 합칠 필요가 없기때문에 return false;
    if (u_parent == v_parent) return false;

    // -4 -> 높이4 , -3 -> 높이 3
    // -> v_parent 더 높이가 높고 그러므로 v_parent 아래 u_parent가 위치해야한다.

    if (this.arr[v_parent] < this.arr[u_parent]) {
      this.arr[u_parent] = v_parent;
    } else if (this.arr[v_parent] == this.arr[u_parent]) {
      this.arr[v_parent] = u_parent; // this.arr[v_parent]의 부모는 u_parent 이다 .
      this.arr[u_parent] -= 1; // 높이가 같다면 u_parent의 높이를 1 증가시킨다.
    } else {
      this.arr[v_parent] = u_parent; // this.arr[v_parent]의 부모는 u_parent 이다 .
    }

    return true;
  }
}

const uf = new UnionFind(new Array(7)); // 7개의 노드 (0~6)

// 초기 상태
console.log(uf.arr); // [-1, -1, -1, -1, -1, -1, -1]

// 유니온 연산 수행
console.log(uf.union(1, 2));
console.log(uf.union(2, 3));
console.log(uf.union(4, 5));
console.log(uf.union(5, 6));
console.log(uf.union(2, 5));
console.log(uf.arr); // [-1, -1, 1, 1, -1, 4, 4, -1]

// // find 연산 수행
// console.log(uf.find(3)); // 1
// console.log(uf.find(6)); // 4
// console.log(uf.find(4)); // 4
