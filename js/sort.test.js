const sort = require('./sort');

const quicksort = sort.qs;

function randomArr(ln, k) {
  let arr = [];
  k = k || ln;
  let loopLn = ln;
  while(loopLn--) {
    arr.push(Math.floor(Math.random() * k))
  }
  return arr;
}

function isOrder(arr) {
  let order = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i- 1] > arr[i]) {
      order = false;
      break;
    }
  }
  return order;
}

test('quick sort algorithm is correct', () => {
  let arr = randomArr(100);
  expect(isOrder(quicksort(arr))).toBe(true);
});
