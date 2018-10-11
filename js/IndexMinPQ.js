class IndexMinPQ {
  constructor(maxN) {
    this._maxN = maxN;
    this._size = 0;
    this._pq = new Array(maxN + 1).fill(0);
    this._qp = new Array(maxN + 1).fill(-1);
    this._keys = new Array(maxN + 1);
  }
  insert(i, key) {
    if (this._size >= this._maxN) return false;
    if (i >= this._maxN) return false;
    if (this.contains(i)) return false;
    const size = this._size + 1;
    this._pq[size] = i;
    this._qp[i] = size;
    this._keys[i] = key;
    this._swim(size);
    this._size++;
    return true;
  }
  delete(i) {
    if (!this.contains(i)) return null;
    const index = this._qp[i];
    const key = this._keys[i];
    this._swap(index, this._size);
    this._size--;
    this._sink(index);
    return key;
  }
  delMin() {
    if (this._size < 1) return null;
    const min = this._pq[1];
    const minKey = this._keys[min];
    this._swap(1, this._size);
    this._qp[min] = -1;
    this._size--;
    this._sink(1);
    return minKey;
  }
  changeKey(i, key) {
    if (!this.contains(i)) return false;
    this._keys[i] = key;
    this._swim(this._qp[i]);
    this._sink(this._qp[i]);
    return true;
  }
  decreaseKey(i, key) {
    if (!this.contains(i)) return false;
    const oldKey = this.keyOf(i);
    if (oldKey < key) return false;
    this._keys[i] = key;
    this._swim(this._qp[i]);
    return true;
  }
  increaseKey(i, key) {
    if (!this.contains(i)) return false;
    const oldKey = this.keyOf(i);
    if (oldKey > key) return false;
    this._keys[i] = key;
    this._sink(this._qp[i]);
    return true;
  }
  isEmpty() {
    return this._size === 0;
  }
  keyOf(i) {
    if (!this.contains(i)) return null;
    return this._keys[i];
  }
  contains(i) {
    if (i < 0 || i >= this._maxN) return false;
    return this._qp[i] !== -1;
  }
  size() {
    return this._size;
  }
  minIndex() {
    if (this.isEmpty()) return -1;
    return this._pq[1];
  }
  minKey() {
    if (this.isEmpty()) return null;
    return this._keys[this._pq[1]];
  }
  _greater(i, j) {
    return this._keys[this._pq[i]] > this._keys[this._pq[j]];
  }
  _swap(i, j) {
    const tmp = this._pq[i];
    this._pq[i] = this._pq[j];
    this._qp[this._pq[i]] = i;
    this._pq[j] = tmp;
    this._qp[tmp] = j;
  }
  _swim(k) {
    let p;
    while((p = k >> 1) >= 1) {
      if (this._greater(p, k)) {
        this._swap(p, k);
        k = p;
      } else {
        break;
      }
    }
  }
  _sink(k) {
    let j;
    while((j = 2 * k) <= this._size && this._greater(k, j)) {
      if (j + 1 <= this._size && this._greater(j+1, j)) j = j+1;
      this._swap(k, j);
      k = j;
    }
  }
}

module.exports = IndexMinPQ;
