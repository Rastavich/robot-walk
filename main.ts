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
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
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

export async function gameLoop(file?: File) {
  let activeRobot: Robot;
  rl.question(
    'Please enter a command (PLACE, MOVE, LEFT, RIGHT, REPORT, or EXIT): ',
    function (answer: string) {
      const result = async (): Promise<Boolean> => {
        console.log(answer);
        console.log(currentDir);
        if (answer === 'EXIT') {
          rl.close();
          return true;
        }

        if (initialPos == null && (await !answer.startsWith('PLACE'))) {
          console.log('Robot must be placed first.');
          return false;
        }

        if (answer.startsWith('ROBOT')) {
          // ROBOT 1 will select that robot
          const robotId = parseInt(answer.split(' ')[1]);
          activeRobot = robotsList.find((robot) => robot.id === robotId);
          if (activeRobot == null) {
            console.log('Robot not found');
            return false;
          }

          currentPos = activeRobot.currentPos;
          currentDir = activeRobot.currentDir;
          console.log('Robot selected', activeRobot.id, currentPos, currentDir);
          return true;
        }

        if (answer.startsWith('PLACE')) {
          let pos = answer.split(' ')[1].split(',');
          let row = parseInt(pos[0]);
          let col = parseInt(pos[1]);
          let dir = pos[2];

          initialPos = [row, col];
          initialDir = direction[getFacingDirection(dir)];

          canPlaceRobot(initialPos, initialDir);
          return false;
        } else {
          switch (answer) {
            case 'MOVE': {
              return robotMove(currentPos, currentDir);
            }
            case 'LEFT': {
              if (currentDir[0] === 0 && currentDir[1] === 1) {
                currentDir = direction[getFacingDirection('SOUTH')];
                return false;
              }
              if (currentDir[0] === 0 && currentDir[1] === -1) {
                currentDir = direction[getFacingDirection('EAST')];
                return false;
              }
              if (currentDir[0] === 1 && currentDir[1] === 0) {
                currentDir = direction[getFacingDirection('NORTH')];
                return false;
              }
              if (currentDir[0] === -1 && currentDir[1] === 0) {
                currentDir = direction[getFacingDirection('WEST')];
                return false;
              }
              return false;
            }
            case 'RIGHT': {
              if (currentDir[0] === 0 && currentDir[1] === 1) {
                currentDir = direction[getFacingDirection('EAST')];
                console.log(currentDir);
                return false;
              }
              if (currentDir[0] === 0 && currentDir[1] === -1) {
                currentDir = direction[getFacingDirection('NORTH')];
                return false;
              }
              if (currentDir[0] === 1 && currentDir[1] === 0) {
                currentDir = direction[getFacingDirection('SOUTH')];
                return false;
              }
              if (currentDir[0] === -1 && currentDir[1] === 0) {
                currentDir = direction[getFacingDirection('WEST')];
                return false;
              }
              return false;
            }
            case 'ROBOT': {
            }
            case 'REPORT': {
              console.log('Robot is at', currentPos, currentDir);
              return true;
            }
            default: {
              console.log('Invalid command');
              return false;
            }
          }
        }
      };

      result().then((res) => {
        gameLoop();
        return res;
      });
    }
  );
}

gameLoop();
