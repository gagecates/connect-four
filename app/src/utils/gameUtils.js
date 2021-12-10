export const deepCloneBoard = (board) => [
  [...board[0]],
  [...board[1]],
  [...board[2]],
  [...board[3]],
  [...board[4]],
  [...board[5]],
]

export const deepCloneDropRow = (row) => [
  [...row]
]

const checkVertical = (board) => {
  // Check only if row is 3 or greater
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (board[row][col]) {
        if (
          board[row][col] === board[row - 1][col] &&
          board[row][col] === board[row - 2][col] &&
          board[row][col] === board[row - 3][col]
        ) {
          return board[row][col]
        }
      }
    }
  }
}

const checkHorizontal = (board) => {
  // Check only if column is 3 or less
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col]) {
        if (
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2] &&
          board[row][col] === board[row][col + 3]
        ) {
          return board[row][col]
        }
      }
    }
  }
}

const checkDiagonalRight = (board) => {
  // Check only if row is 3 or greater AND column is 3 or less
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col]) {
        if (
          board[row][col] === board[row - 1][col + 1] &&
          board[row][col] === board[row - 2][col + 2] &&
          board[row][col] === board[row - 3][col + 3]
        ) {
          return board[row][col]
        }
      }
    }
  }
}

const checkDiagonalLeft = (board) => {
  // Check only if row is 3 or greater AND column is 3 or greater
  for (let row = 3; row < 6; row++) {
    for (let col = 3; col < 7; col++) {
      if (board[row][col]) {
        if (
          board[row][col] === board[row - 1][col - 1] &&
          board[row][col] === board[row - 2][col - 2] &&
          board[row][col] === board[row - 3][col - 3]
        ) {
          return board[row][col]
        }
      }
    }
  }
}

const checkDraw = (board) => {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (board[row][col] === null) {
        return null
      }
    }
  }
  return 'draw'
}

export const checkForWin = (board) => {
  return (
    checkVertical(board) ||
    checkDiagonalRight(board) ||
    checkDiagonalLeft(board) ||
    checkHorizontal(board) ||
    checkDraw(board)
  )
}