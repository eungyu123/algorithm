class UnionFind {
  constructor(arr = []) {
    this.arr = Array(arr.length + 1).fill(-1);
  }

  // 시간복잡도 -> N,
  // 최악의 경우 Find 1 ->  1 -> 2 -> 3 -> 4 -> 5 -> 6
  find(x) {
    if (this.arr[x] == -1) {
      // if( arr[x] < 0 ) return x
      return x;
    }
    return this.find(this.arr[x]);
  }

  // union 연산에서도 find연산을 두번이나 하기 때문에 시간복잡도 N
  union(u, v) {
    const u_parent = this.find(u);
    const v_parent = this.find(v);
    if (u_parent == v_parent) return false;

    this.arr[v_parent] = u_parent;
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

console.log(uf.arr); // [-1, -1, 1, 1, -1, 4, 4, -1]

// find 연산 수행
console.log(uf.find(3)); // 1
console.log(uf.find(6)); // 4
console.log(uf.find(4)); // 4
