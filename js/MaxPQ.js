class MaxPQ {
  constructor() {
    this._pq = [];
    this._size = 0;
  }

  _swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  _swim(i) {
    let pq = this._pq;
    let p;
    while(i > 1 && (p = i / 2 >> 0) && pq[p] < pq[i]) {
      this._swap(pq, i, p);
      i = p;
    }
  }

  _sink(p) {
    let pq = this._pq;
    while(p*2 <= this._size) {
      let j = p * 2;
      if (j < this._size && pq[j] < pq[j+1]) j++;
      if (pq[p] >= pq[j]) break;
      this._swap(pq, p, j);
      p = j;
    }
  }

  insert(k) {
    this._pq[++this._size] = k;
    this._swim(this._size);
  }

  max() {
    return this._pq[1];
  }

  delMax() {
    if (this.isEmpty()) return null;
    let max = this._pq[1];
    this._swap(this._pq, 1, this._size--);
    this._sink(1);
    return max;
  }

  isEmpty() {
    return this._size === 0;
  }

  size() {
    return this._size;
  }
}

module.exports = MaxPQ;