function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function quicksort(arr, l, r) {
  l = l || 0;
  r = r || arr.length - 1;
  let m = ( l + r ) >> 1;
  let pivot = arr[m];
  let low = l;
  let high = r;
  while (low <= high) {
    while(arr[low] < pivot) low++;
    while(arr[high] > pivot) high--;
    if (low <= high) {
      swap(arr, low, high);
      low++;
      high--;
    }
  }
  if (low < r) {
    quicksort(arr, low, r);
  }
  if (high > l) {
    quicksort(arr, l, high);
  }
  return arr;
}

function _mergesort(arr, l, r) {
  if (r <= l) return arr;

  let mid = (l + r) >> 1;
  _mergesort(arr, l, mid);
  _mergesort(arr, mid + 1, r);

  let left = arr.slice(l, mid + 1);
  left.push(Infinity);
  let right = arr.slice(mid + 1, r);
  right.push(Infinity);

  let i = j = 0;
  let index = l;
  for (; i < left.length && j < right.length;) {
    if (left[i] <= right[j]) {
      arr[index++] = left[i];
      i++;
    } else {
      arr[index++] = right[i];
      j++;
    }
  }
  for (; i < left.length; i++) {
    mergeArr.push(left[i]);
  }
  for (; j < right.length; j++) {
    mergeArr.push(right[j]);
  }
  return mergeArr;
}

function mergesort(arr) {
  return _mergesort(arr, 0, arr.length - 1);
}

module.exports = {
  qs: quicksort,
  ms: mergesort,
};

