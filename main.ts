import { dirCords, Dir, directions, gridSize } from './consts';
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
let activeRobot: Robot;

export function handleMove(map: number[], dir: number[]): boolean {
  if (
    map[0] + dir[0] < gridSize.minX ||
    map[0] + dir[0] > gridSize.maxX ||
    map[1] + dir[1] < gridSize.minY ||
    map[1] + dir[1] > gridSize.maxY
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

export function handlePlace(answer: String): boolean {
  let pos = answer.split(' ')[1].split(',');
  let row = parseInt(pos[0]);
  let col = parseInt(pos[1]);
  let dir = pos[2];

  initialPos = [row, col];
  initialDir = dirCords[getFacingDirection(dir)];

  if (pos == null || dir == null) {
    console.log('Invalid input');
    return false;
  }

  if (
    initialPos[0] < gridSize.minX ||
    initialPos[0] > gridSize.maxX ||
    initialPos[1] < gridSize.minY ||
    initialPos[1] > gridSize.maxY
  ) {
    console.log('Robot must be placed in the grid');
    return false;
  }

  // If there is already a robot in the position then return false
  for (let value of robotsList) {
    if (
      value.currentPos[0] == initialPos[0] &&
      value.currentPos[1] == initialPos[1]
    ) {
      console.log('Robot already exists');
      return false;
    }
  }

  currentPos = initialPos;
  currentDir = initialDir;

  let robot: Robot = {
    id: robotsList.length++,
    initialPos: initialPos,
    initialDir: initialDir,
    currentPos: currentPos,
    currentDir: currentDir,
  };

  robotsList.push(robot);
  console.log('Robot info', robot.id, robot.initialPos, robot.initialDir);
  console.log('Robot placed', currentPos, initialDir);
  return true;
}

export function getFacingDirection(direction: string): number {
  switch (direction) {
    case directions.north:
      return Dir.North;
    case directions.south:
      return Dir.South;
    case directions.west:
      return Dir.West;
    case directions.east:
      return Dir.East;
    default:
      console.log('Invalid direction');
      return -1;
  }
}

function handleRight(): Boolean {
  if (currentDir[0] === 0 && currentDir[1] === 1) {
    currentDir = dirCords[getFacingDirection(directions.east)];
    console.log(currentDir);
    return true;
  }
  if (currentDir[0] === 0 && currentDir[1] === -1) {
    currentDir = dirCords[getFacingDirection(directions.north)];
    return true;
  }
  if (currentDir[0] === 1 && currentDir[1] === 0) {
    currentDir = dirCords[getFacingDirection(directions.south)];
    return true;
  }
  if (currentDir[0] === -1 && currentDir[1] === 0) {
    currentDir = dirCords[getFacingDirection(directions.west)];
    return true;
  }
  return false;
}

function handleLeft(): Boolean {
  if (currentDir[0] === 0 && currentDir[1] === 1) {
    currentDir = dirCords[getFacingDirection('SOUTH')];
    return false;
  }
  if (currentDir[0] === 0 && currentDir[1] === -1) {
    currentDir = dirCords[getFacingDirection('EAST')];
    return false;
  }
  if (currentDir[0] === 1 && currentDir[1] === 0) {
    currentDir = dirCords[getFacingDirection(directions.north)];
    return false;
  }
  if (currentDir[0] === -1 && currentDir[1] === 0) {
    currentDir = dirCords[getFacingDirection('WEST')];
    return false;
  }
  return false;
}

function handleReport(): Boolean {
  // Convert currentDir to its text value
  let facingDirection: string;
  switch (currentDir[0]) {
    case 0:
      facingDirection = directions.north;
      break;
    case 1:
      facingDirection = 'EAST';
      break;
    case -1:
      facingDirection = 'WEST';
      break;
    case -1:
      facingDirection = 'SOUTH';
      break;
    default:
      facingDirection = 'UNKNOWN';
      break;
  }

  console.log(
    'Output: ',
    currentPos[0] + ',',
    currentPos[1] + ',',
    facingDirection
  );
  return true;
}

function handleExit(): Boolean {
  rl.close();
  return false;
}

function handleRobot(answer: String): Boolean {
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

export async function gameLoop(file?: File) {
  rl.question(
    'Please enter a command (PLACE, MOVE, LEFT, RIGHT, REPORT, or EXIT): ',
    function (answer: string) {
      const result = async (): Promise<Boolean> => {
        if (answer === 'EXIT') {
          return handleExit();
        }

        if (initialPos == null && !answer.startsWith('PLACE')) {
          console.log('Robot must be placed first.');
          return false;
        }

        if (answer.startsWith('ROBOT')) {
          return handleRobot(answer);
        }

        if (answer.startsWith('PLACE')) {
          return handlePlace(answer);
        } else {
          switch (answer) {
            case 'MOVE': {
              return handleMove(currentPos, currentDir);
            }
            case 'LEFT': {
              return handleLeft();
            }
            case 'RIGHT': {
              return handleRight();
            }
            case 'REPORT': {
              return handleReport();
            }
            default: {
              console.log('Invalid command');
              return false;
            }
          }
        }
      };

      result().then((res) => {
        console.log(res);
        gameLoop();
        return res;
      });
    }
  );
}

gameLoop();
