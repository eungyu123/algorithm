class TreeNode {
  value;
  left;
  right;

  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root;

  constructor() {
    this.root = null;
  }

  // 📌 1. 값 삽입 (insert)
  insert(value) {
    this.root = this._insertNode(this.root, value);
  }

  _insertNode(node, value) {
    if (node === null) return new TreeNode(value);

    if (value < node.value) node.left = this._insertNode(node.left, value);
    else if (value > node.value)
      node.right = this._insertNode(node.right, value);

    return node;
  }

  // 📌 2. 값 탐색 (search)
  search(value) {
    return this._searchNode(this.root, value);
  }

  _searchNode(node, value) {
    if (node === null) return false;
    if (node.value === value) return true;
    return value < node.value
      ? this._searchNode(node.left, value)
      : this._searchNode(node.right, value);
  }

  // 📌 3. 값 삭제 (remove)
  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  _removeNode(node, value) {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this._removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value);
    } else {
      // 삭제할 노드 찾음
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // 오른쪽 서브트리에서 최솟값 찾기 (대체할 값)
      let minNode = this._findMinNode(node.right);
      node.value = minNode.value;
      node.right = this._removeNode(node.right, minNode.value);
    }

    return node;
  }

  _findMinNode(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  // 📌 4. 중위 순회 (Inorder Traversal) → 정렬된 값 출력
  inorderTraversal() {
    const result = [];
    this._inorderHelper(this.root, result);
    return result;
  }

  _inorderHelper(node, result) {
    if (node !== null) {
      this._inorderHelper(node.left, result);
      result.push(node.value);
      this._inorderHelper(node.right, result);
    }
  }
}

// 사용 예시
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log("10 탐색:", bst.search(10)); // true
console.log("5 탐색:", bst.search(5)); // true
console.log("12 탐색:", bst.search(12)); // false

// 이진 검색트리에서 중위 순회한다면 무조건 오름차순으로 정렬됨
console.log("중위 순회:", bst.inorderTraversal()); // [3, 5, 7, 10, 15]

bst.remove(5);
console.log("5 삭제 후 중위 순회:", bst.inorderTraversal()); // [3, 7, 10, 15]
