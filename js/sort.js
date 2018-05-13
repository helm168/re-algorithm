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

module.exports = {
  qs: quicksort,
}

