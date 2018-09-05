#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <sys/time.h>

#define MAX(a, b) (a > b ? a : b)
#define MIN(a, b) (a > b ? b : a)

void swap(int* arr, int i, int j) {
  int tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

long long current_timestamp() {
  struct timeval te; 
  gettimeofday(&te, NULL);
  long long milliseconds = te.tv_sec * 1000LL + te.tv_usec / 1000;
  return milliseconds;
}

void printArr(int *arr, int ln) {
  int i;
  for(i = 0; i < ln; i++) {
    printf("%d ", arr[i]);
  }
  printf("\n");
}

void select_sort(int* arr, int ln) {
  int i;
  int j;
  for (i = 0; i < ln - 1; i++) {
    int s = i;
    for (j = i + 1; j < ln; j++) {
      if (arr[s] > arr[j]) {
        s = j;
      }
    }
    swap(arr, s, i);
  }
}

void insert_sort(int *arr, int ln) {
  int i;
  int j;
  for (j = 1; j < ln; j++) {
   int key = arr[j];
   i = j - 1;
   while(i >= 0 && arr[i] > key) {
     arr[i + 1] = arr[i];
     i = i - 1;
   }
   arr[i + 1] = key;
  }
}

void shell_sort(int* arr, int ln) {
  int h = 1;
  while(h < ln / 3) h = h * 3 + 1;
  while(h >= 1) {
    int j;
    for(j = h; j < ln; j++) {
      int key = arr[j];
      int i = j - h;
      while(i >= 0 && arr[i] > key) {
        arr[i + h] = arr[i];
        i = i - h;
      }
      arr[i + h] = key;
    }
    h = h / 3;
  }
}

void do_merge(int* arr, int low, int mid, int high, int* aux) {
  int ln = high - low + 1;
  int i;
  for(i = low; i <= high; i++) {
    aux[i] = arr[i];
  }
  i = low;
  int p = low;
  int q = mid + 1;
  while(i <= high) {
    if (p > mid) arr[i++] = aux[q++];
    else if (q > high) arr[i++] = aux[p++];
    else if (aux[p] < aux[q]) arr[i++] = aux[p++];
    else arr[i++] = aux[q++];
  }
}

void do_merge_sort(int* arr, int low, int high, int* aux) {
  if (low >= high) return;
  int mid = (low + high) >> 1;
  do_merge_sort(arr, low, mid, aux);
  do_merge_sort(arr, mid + 1, high, aux);
  do_merge(arr, low, mid, high, aux);
}

void merge_sort(int* arr, int ln) {
  int aux[ln];
  do_merge_sort(arr, 0, ln - 1, aux);
}

void merge_sort_bu(int* arr, int ln) {
  int aux[ln];
  for(int sz = 1; sz < ln; sz = sz+sz) {
    for(int lo = 0; lo < ln-sz; lo += (sz+sz)) {
      do_merge(arr, lo, lo+sz-1, MIN(lo+sz+sz-1, ln-1), aux);
    }
  }
}

int parent(i) {
  return i >> 1;
}

int left(i) {
  return i << 1;
}

void maxHeapify(int* arr, int i, int max) {
  while(i * 2 <= max) {
    int j = left(i);
    if (j < max && arr[j] < arr[j+1]) j++;
    if (arr[i] >= arr[j]) break;
    swap(arr, i, j);
    i = j;
  }
}

void buildMaxHeap(int* arr, int ln) {
  int mid = ln >> 1;
  int i = mid;
  for(int i = mid; i >= 1; i--) {
    maxHeapify(arr, i, ln);
  }
}

void heap_sort(int* arr, int ln) {
  buildMaxHeap(arr, ln);
  int size = ln;
  while(size >= 1) {
    swap(arr, 1, size);
    size--;
    maxHeapify(arr, 1, size);
  }
}

void do_quick_sort(int *arr, int lo, int hi) {
  int mid = (hi + lo) >> 1;
  int pivot = arr[mid];
  int i = lo;
  int j = hi;
  while(i <= j) {
    while(arr[i] < pivot) i++;
    while(arr[j] > pivot) j--;
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  if (lo < j) {
    do_quick_sort(arr, lo, j);
  }
  if (i < hi) {
    do_quick_sort(arr, i, hi);
  }
}

void quick_sort(int* arr, int ln) {
  do_quick_sort(arr, 0, ln - 1);
}

int* randomArr(int ln, int max, int from) {
  static int* r;
  r = malloc(ln * sizeof(int));

  srand( (unsigned)time( NULL ) );

  int i;
  for(i = from; i < ln; i++) {
    r[i] = rand() % max;
  }
  return r;
}

int is_order(int* arr, int ln, int from) {
  int i;
  for (i = from + 1; i < ln; i++) {
    if (arr[i] < arr[i - 1]) {
      return 0;
    }
  }
  return 1;
}

int main() {
  int ln = 5000000;
  int max = 10000;
  int from = 1;
  int *arr = randomArr(ln, max, from);
  // printArr(arr, ln);
  printf("before sort, is_order: %d\n", is_order(arr, ln, from));
  long long start = current_timestamp();
  // select_sort(arr, ln);
  // insert_sort(arr, ln);
  // shell_sort(arr, ln);
  heap_sort(arr, ln);
  // merge_sort(arr, ln);
  // merge_sort_bu(arr, ln);
  quick_sort(arr, ln);
  // printArr(arr, ln);
  long long end = current_timestamp();
  printf("sort cost: %lld\n", end - start);
  printf("after sort, is_order: %d\n", is_order(arr, ln, from));
}