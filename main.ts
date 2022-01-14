enum Dir {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
  None = 4,
}

const direction = [
  [Dir.Down, 1, 0],
  [Dir.Right, 0, 1],
  [Dir.Up, -1, 0],
  [Dir.Left, 0, -1],
];

let initialPos: string[][];

function robotMove(
  map: string[][],
  row: number,
  col: number,
  dir: string[][],
  report: boolean
): boolean {
  // This is a wall, cant move
  if (row < 0 || row >= map.length || col < 0 || col >= map[0].length) {
    return false;
  }

  if (report) {
    console.log(map[row][col]);
    return true;
  }
}

function placeRobot(map: string[][], row: number, col: number): boolean {
  if (map[row][col] > '5' || map[row][col] < '0') {
    return false;
  }

  initialPos = map[row][col];
  return true;
}
