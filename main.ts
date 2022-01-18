import { dirCords, Dir, directions, gridSize, Robot } from './consts';
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let initialPos: number[];
let initialDir: number[];
let currentPos: number[];
let currentDir: number[];

let robotsList: Array<Robot> = [];
let activeRobot: Robot;

export function handleMove(map: number[], dir: number[]): number[] {
  if (
    map[0] + dir[0] < gridSize.minX ||
    map[0] + dir[0] > gridSize.maxX ||
    map[1] + dir[1] < gridSize.minY ||
    map[1] + dir[1] > gridSize.maxY
  ) {
    console.log('Robot cant move');
    return [];
  }

  // This is a valid move
  map[0] += dir[0];
  map[1] += dir[1];

  currentPos = map;
  currentDir = dir;

  console.log('Robot moved', currentPos, currentDir);

  return currentPos;
}

export function handlePlace(answer: String): String[] {
  let pos = answer.split(' ')[1].split(',');
  let row = parseInt(pos[0]);
  let col = parseInt(pos[1]);
  let dir = pos[2];

  initialPos = [row, col];
  initialDir = dirCords[getFacingDirection(dir)];

  if (pos == null || dir == null) {
    console.log('Invalid input');
    return null;
  }

  if (
    initialPos[0] < gridSize.minX ||
    initialPos[0] > gridSize.maxX ||
    initialPos[1] < gridSize.minY ||
    initialPos[1] > gridSize.maxY
  ) {
    console.log('Robot must be placed in the grid');
    return null;
  }

  // If there is already a robot in the position then return false
  for (let value of robotsList) {
    if (
      value.currentPos[0] == initialPos[0] &&
      value.currentPos[1] == initialPos[1]
    ) {
      console.log('Robot already exists');
      return null;
    }
  }

  currentPos = initialPos;
  currentDir = initialDir;

  let robot: Robot = {
    id: robotsList.length + 1,
    initialPos: initialPos,
    initialDir: initialDir,
    currentPos: currentPos,
    currentDir: currentDir,
  };

  robotsList.push(robot);
  activeRobot = robot;
  console.log('Robot info', robot.id, robot.initialPos, robot.initialDir);
  console.log('Robot placed', currentPos, initialDir);
  return handleReport(currentDir, currentPos);
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

export function handleRight(): Boolean {
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

export function handleLeft(): Boolean {
  if (currentDir[0] === 0 && currentDir[1] === 1) {
    currentDir = dirCords[getFacingDirection(directions.south)];
    return true;
  }
  if (currentDir[0] === 0 && currentDir[1] === -1) {
    currentDir = dirCords[getFacingDirection(directions.east)];
    return true;
  }
  if (currentDir[0] === 1 && currentDir[1] === 0) {
    currentDir = dirCords[getFacingDirection(directions.north)];
    return true;
  }
  if (currentDir[0] === -1 && currentDir[1] === 0) {
    currentDir = dirCords[getFacingDirection(directions.west)];
    return true;
  }
  return false;
}

export function handleReport(dir: number[], pos: number[]): String[] {
  // Convert currentDir to its text value
  let facingDirection: string;
  // Get facing direction of activeRobot

  if (dir[0] === 0 && dir[1] === 1) {
    facingDirection = directions.north;
  } else if (dir[0] === 0 && dir[1] === -1) {
    facingDirection = directions.south;
  } else if (dir[0] === 1 && dir[1] === 0) {
    facingDirection = directions.east;
  } else if (dir[0] === -1 && dir[1] === 0) {
    facingDirection = directions.west;
  } else {
    console.log('Invalid direction');
    return ['', ''];
  }

  console.log('Output: ', pos[0] + ',', pos[1] + ',', facingDirection);
  return [pos[0] + ', ' + pos[1], facingDirection];
}

export function handleRobot(answer: String): Boolean {
  const robotId = parseInt(answer.split(' ')[1]);
  console.log(robotId);
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
          rl.close();
          return false;
        }

        if (
          initialPos == null &&
          !answer.startsWith('PLACE') &&
          answer != 'EXIT'
        ) {
          console.log('Robot must be placed first.');
          return true;
        }

        if (answer.startsWith('ROBOT')) {
          return handleRobot(answer);
        }

        if (answer.startsWith('PLACE')) {
          handlePlace(answer);
          return true;
        } else {
          switch (answer) {
            case 'MOVE': {
              handleMove(currentPos, currentDir);
              return true;
            }
            case 'LEFT': {
              return handleLeft();
            }
            case 'RIGHT': {
              return handleRight();
            }
            case 'REPORT': {
              handleReport(activeRobot.currentDir, activeRobot.currentPos);
              return true;
            }
            default: {
              console.log('Invalid command');
              return true;
            }
          }
        }
      };

      result().then((res) => {
        if (!res) {
          return;
        }
        gameLoop();
        return res;
      });
    }
  );
}

gameLoop();
