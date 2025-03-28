class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charcodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    let index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    let index = this._hash(key);
    if (this.keyMap[index]) {
      for (let pair of this.keyMap[index]) {
        if (pair[0] === key) {
          return pair[1];
        }
      }
    }
    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  delete(key) {
    let index = this._hash(key);
    if (this.keyMap[index]) {
      this.keyMap[index] = this.keyMap[index].filter((pair) => pair[0] !== key);
      return true;
    }
    return false;
  }

  keys() {
    let keysArr = [];
    for (let bucket of this.keyMap) {
      if (bucket) {
        for (let pair of bucket) {
          keysArr.push(pair[0]);
        }
      }
    }
    return keysArr;
  }

  values() {
    let valuesArr = new Set();
  }
}

console.log("A".charCodeAt(0));
