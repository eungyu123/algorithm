class UnionFind {
  constructor(arr = []) {
    this.arr = [...arr];
  }

  find(x) {
    if (this.arr[x] < 0) {
      return x;
    }
    return (this.arr[x] = this.find(this.arr[x]));
  }

  union(u, v) {
    const u_parent = this.find(u);
    const v_parent = this.find(v);

    if (u_parent == v_parent) return false;

    // 높이는 음수이기 대문에 크기가 더작으면 더 높은것
    if (this.arr[u_parent] < this.arr[v_parent]) {
      this.arr[v_parent] = u_parent; // u_parent가 부모
    } else if (this.arr[u_parent] == this.arr[v_parent]) {
      this.arr[u_parent] = v_parent;
      this.arr[v_parent] -= 1;
    } else {
      this.arr[u_parent] = v_parent;
    }

    return true;
  }
}

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const arr = Array(n + 1).fill(-1);
const UNION_FIND = new UnionFind(arr);

for (let i = 0; i < m; i++) {
  const [operate, u, v] = input[i].trim().split(" ").map(Number);
  if (operate == 0) {
    UNION_FIND.union(u, v);
  }

  if (operate == 1) {
    const u_p = UNION_FIND.find(u);
    const v_p = UNION_FIND.find(v);
    if (u_p == v_p) {
      console.log("YES");
    } else {
      console.log("NO");
    }
  }
}
