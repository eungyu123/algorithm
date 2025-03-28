class TrieNode {
  children;
  isEndOfWord;
}

class Trie {
  root = new TrieNode();

  // 단어 삽입
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // 단어 검색 (정확한 일치)
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // 특정 접두사로 시작하는 단어 찾기 (자동완성 기능)
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}

// 테스트
const trie = new Trie();

// 아니면 그냥 규모큰거해도되고
