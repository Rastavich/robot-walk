export enum Dir {
  North = 0,
  South = 2,
  West = 3,
  East = 1,
  None,
}

export const directions = {
  north: 'NORTH',
  south: 'SOUTH',
  east: 'EAST',
  west: 'WEST',
};

export const dirCords = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export const gridSize = {
  minX: 0,
  maxX: 4,
  minY: 0,
  maxY: 4,
};
