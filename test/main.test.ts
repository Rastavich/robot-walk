import { getFacingDirection, canPlaceRobot, robotMove } from '../main';

import { expect } from 'chai';

describe('Tests', () => {
  it('should be able to return the correct directions enum mapping', () => {
    expect(getFacingDirection('NORTH')).to.equal(0);
    expect(getFacingDirection('SOUTH')).to.equal(2);
    expect(getFacingDirection('EAST')).to.equal(1);
    expect(getFacingDirection('WEST')).to.equal(3);
  });
  it('should be able to place a robot', () => {
    expect(canPlaceRobot([0, 1], [1, 0])).to.equal(true);
  });
});
