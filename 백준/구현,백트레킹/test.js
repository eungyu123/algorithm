function rotate(arr, r, c, s) {
  for (let i = 1; i <= s; i++) {
    const top = r - i - 1;
    const down = r + i - 1;
    const left = c - i - 1;
    const right = c + i - 1;

    let temp = arr[top][right]; // 오른쪽 상단 값 저장

    // 이동 방향 (우, 하, 좌, 상)
    const directions = [
      [0, -1], // ← 왼쪽
      [1, 0], // ↓ 아래
      [0, 1], // → 오른쪽
      [-1, 0], // ↑ 위쪽
    ];

    let curRow = top;
    let curCol = right;
    for (const [dr, dc] of directions) {
      while (true) {
        const nextRow = curRow + dr;
        const nextCol = curCol + dc;

        if (
          nextRow < top ||
          nextRow > down ||
          nextCol < left ||
          nextCol > right
        )
          break;

        arr[curRow][curCol] = arr[nextRow][nextCol];
        curRow = nextRow;
        curCol = nextCol;
      }
    }

    arr[top + 1][right] = temp; // 저장한 값 복구
  }
}

const arr = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];

rotate(arr, 3, 3, 2);
console.table(arr);
