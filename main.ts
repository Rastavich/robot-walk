var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

enum Dir {
  North = 0,
  South = 2,
  West = 3,
  East = 1,
  None,
}

const direction = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

let initialPos: number[];
let initialDir: number[];
let currentPos: number[];
let currentDir: number[];

interface Robot {
  id: number;
  initialPos: number[];
  initialDir: number[];
  currentPos: number[];
  currentDir: number[];
}

let robotsList: Array<Robot> = [];

export function robotMove(map: number[], dir: number[]): boolean {
  // This is a wall, cant move
  if (
    map[0] + dir[0] < 0 ||
    map[0] + dir[0] > 4 ||
    map[1] + dir[1] < 0 ||
    map[1] + dir[1] > 4
  ) {
    console.log('Robot cant move');
    return false;
  }

  // This is a valid move
  map[0] += dir[0];
  map[1] += dir[1];

  currentPos = map;
  currentDir = dir;

  console.log('Robot moved', currentPos, currentDir);

  return true;
}

export function canPlaceRobot(pos: number[], dir: number[]): boolean {
  if (pos == null || dir == null) {
    console.log('Invalid input');
    return false;
  }

  if (pos[0] < 0 || pos[0] > 4 || pos[1] < 0 || pos[1] > 4) {
    console.log('Robot must be placed in the grid');
    return false;
  }

  currentPos = pos;
  currentDir = dir;

  let robot: Robot = {
    id: robotsList.length + 1,
    initialPos: pos,
    initialDir: dir,
    currentPos: pos,
    currentDir: dir,
  };

  robotsList.push(robot);
  console.log('Robot info', robot.id, robot.initialPos, robot.initialDir);
  console.log('Robot placed', currentPos, initialDir);
  return true;
}

export function getFacingDirection(direction: string): number {
  switch (direction) {
    case 'NORTH':
      return Dir.North;
    case 'SOUTH':
      return Dir.South;
    case 'WEST':
      return Dir.West;
    case 'EAST':
      return Dir.East;
    default:
      console.log('Invalid direction');
      return -1;
  }
}

export function gameLoop(): boolean {
  let activeRobot: Robot;
  let gameOver: boolean = rl.question(
    'Please enter a command (PLACE, MOVE, LEFT, RIGHT, REPORT, or EXIT): ',
    function (answer: string) {
      if (answer.startsWith('PLACE')) {
        let pos = answer.split(' ')[1].split(',');
        let row = parseInt(pos[0]);
        let col = parseInt(pos[1]);
        let dir = pos[2];

        initialPos = [row, col];
        initialDir = direction[getFacingDirection(dir)];

        canPlaceRobot(initialPos, initialDir);
        gameLoop();
      }

      if (answer === 'EXIT') {
        rl.close();
        return true;
      } else if (initialPos == null) {
        console.log('Robot must be placed first.');
        gameLoop();
        return false;
      } else {
        switch (answer) {
          case 'MOVE': {
            gameLoop();
            return robotMove(currentPos, currentDir);
          }
          case 'LEFT': {
            let dir = currentDir.map((x) => x * -1);

            gameLoop();
            return robotMove(currentPos, dir);
          }
          case 'RIGHT': {
          }
          case 'REPORT': {
            console.log('Robot is at', currentPos, currentDir);
            return true;
          }
          default: {
            console.log('Invalid command');
            gameLoop();
          }
        }
      }
    }
  );

  if (gameOver) {
    return true;
  } else {
    return false;
  }
}

gameLoop();
