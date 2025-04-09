function combine(index, arr) {
  if (arr.length === 2) {
    console.log(arr);
    return;
  }

  for (let i = index; i < 4; i++) {
    combine(i + 1, [...arr, i]);
  }
}

combine(0, []);
