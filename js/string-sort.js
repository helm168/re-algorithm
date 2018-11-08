const R = 256;

function keyIndextedStringSort(arr, R) {
  const count = new Array(R+1).fill(0);
  for(let i = 0; i < arr.length; i++) {
    count[arr[i].key + 1]++;
  }
  for(let i = 0; i < R; i++) {
    count[i+1] += count[i];
  }
  const aux = new Array(arr.lenth);
  for(let i = 0; i < arr.length; i++) {
    aux[count[arr[i].key]++] = arr[i];
  }
  for(let i = 0; i < arr.length; i++) {
    arr[i] = aux[i];
  }
}

function keyIndextedStringSort2(arr, R) {
  const count = new Array(R).fill(0);
  for(let i = 0; i < arr.length; i++) {
    count[arr[i].key]++;
  }
  for(let i = 0; i < R - 1; i++) {
    count[i+1] += count[i];
  }
  const aux = new Array(arr.lenth);
  for(let i = 0; i < arr.length; i++) {
    aux[count[arr[i].key - 1]++] = arr[i];
  }
  for(let i = 0; i < arr.length; i++) {
    arr[i] = aux[i];
  }
}

function lsd(arr, w) {
  const ln = arr.length;
  const aux = new Array(ln);
  for(let d = w-1; d >= 0; d--) {
    const count = new Array(R + 1).fill(0);
    for(let i = 0; i < ln; i++) {
      const code = arr[i].charCodeAt(d) + 1;
      count[arr[i].charCodeAt(d)+1]++;
    }
    for(let j = 0; j < R; j++) {
      count[j+1] += count[j];
    }
    for(let i = 0; i < ln; i++) {
      aux[count[arr[i].charCodeAt(d)]++] = arr[i];
    }
    for(let i = 0; i < ln; i++) {
      arr[i] = aux[i];
    }
  }
  return arr;
}

const w = 0;
function codeAt(arr, i, d) {
  if (!arr[i]) console.error('codeAt', arr, i, d);
  if (d >= arr[i].length) return -1;
  return arr[i].charCodeAt(d);
}

function doMsd(arr, lo, hi, d) {
  if (lo >= hi) return;
  const count = new Array(R + 2).fill(0);
  for (let i = lo; i <= hi; i++) {
    count[codeAt(arr, i, d) + 2]++;
  }
  for (let i = 0; i < R + 1; i++) {
    count[i+1] += count[i];
  }
  const aux = new Array(hi - lo + 1);
  for (let i = lo; i <= hi; i++) {
    aux[count[codeAt(arr, i, d) + 1]++] = arr[i];
  }
  for (let i = lo; i <= hi; i++) {
    arr[i] = aux[i - lo];
  }
  for (let r = 0; r < R; r++) {
    doMsd(arr, lo+count[r], lo+count[r+1]-1, d+1);
  }
}

function msd(arr) {
  doMsd(arr, 0, arr.length - 1, 0);
  return arr;
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j]
  arr[j] = tmp;
}

function doQuick3(arr, lo, hi, d) {
  if (lo >= hi) return;
  let v = codeAt(arr, lo, d);
  let lt = lo;
  let gt = hi;
  let i = lo + 1;
  while(i <= gt) {
    const t = codeAt(arr, i, d);
    if (t < v) {
      swap(arr, i++, lt++);
    } else if (t > v) {
      swap(arr, i, gt--);
    } else {
      i++;
    }
  }
  doQuick3(arr, lo, lt-1, d);
  if (v != -1) doQuick3(arr, lt, gt, d+1);
  doQuick3(arr, gt+1, hi, d);
}

function quick3string(arr) {
  doQuick3(arr, 0, arr.length - 1, 0);
  return arr;
}

module.exports = {
  keyIndextedStringSort,
  keyIndextedStringSort2,
  lsd,
  msd,
  quick3string
};

