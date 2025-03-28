class HashMap {
  map;

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
