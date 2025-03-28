class HashMap {
  constructor() {
    this.map = {};
  }

  hashKey(key) {
    return JSON.stringify(key);
  }

  set(key, value) {
    this.map[this.hashKey(key)] = value;
  }

  get(key) {
    return this.map[this.hashKey(key)];
  }

  has(key) {
    return this.hashKey(key) in this.map;
  }

  delete(key) {
    const hashedKey = this.hashKey(key);
    // in 메서드 오랜만인데
    if (hashedKey in this.map) {
      delete this.map[hashedKey];
      return true;
    }
    return false;
  }
  clear() {
    this.map = {};
  }
}

const a = [1, 2, 3, 4, 5];
const b = { a: 1, b: 2 };

console.log(1 in a);
console.log("a" in b);

const hashMap = new HashMap();

hashMap.set("1", 2);
const c = hashMap.get("1");
console.log(c);
