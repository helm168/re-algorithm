let c1 = 0;
function rodCut(p, n) {
  c1++;
  if (n == 0) return 0;
  let q = -Infinity;
  for (let i = 0; i < n; i++) {
    q = Math.max(q, p[i + 1] + rodCut(p, n - i - 1));
  }
  return q;
}

function memoizedRodCut(p, n) {
  let r = {};
  return memoizedRodCutAux(p, n, r);
}

function memoizedRodCutAux(p, n, r) {
  c1++;
  if (r[n]) return r[n];
  if (n == 0) return 0;
  let q = -Infinity;
  for (let i = 0; i < n; i++) {
    q = Math.max(q, p[i + 1] + memoizedRodCutAux(p, n - i - 1, r));
  }
  r[n] = q;
  return q;
}

function bottomUpRodCut(p, n) {
  let r = {};
  r[0] = 0;
  let q = -Infinity;
  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= j; i++) {
      c1++;
      q = Math.max(q, p[i] + r[j - i]);
    }
    r[j] = q;
  }
  return r[n];
}

function extendBottomUpRodCut(p, n) {
  let r = {};
  let s = {};
  r[0] = 0;
  let q = -Infinity;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (q < p[j] + r[i - j]) {
        q = p[j] + r[i - j];
        s[i] = j;
      }
    }
    r[i] = q;
  }
  return [r, s];
}

function printRotCutSolution(p, n) {
  let [r, s] = extendBottomUpRodCut(p, n);
  while (n > 0) {
    console.debug(s[n]);
    n = n - s[n];
  }
}

let p = {
  1: 1,
  2: 5,
  3: 8,
  4: 9,
  5: 10,
  6: 17,
  7: 17,
  8: 20,
  9: 24,
  10: 30
};

//console.debug('optimal value is', rodCut(p, 10), 'times', c1);
//console.debug('optimal value is', memoizedRodCut(p, 10), 'times', c1);
//console.debug('optimal value is', bottomUpRodCut(p, 10), 'times', c1);
//console.debug('optimal value is', extendBottomUpRodCut(p, 10), 'times', c1);
printRotCutSolution(p, 10);
