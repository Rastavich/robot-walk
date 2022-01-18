import {
  handleMove,
  handlePlace,
  handleLeft,
  handleRight,
  handleReport,
  handleRobot,
} from '../main';

import { expect } from 'chai';

describe('Test all', () => {
  //place a robot
  it('should be able to place a robot', () => {
    expect(handlePlace('PLACE 1,1,NORTH')).to.eql(['1, 1', 'NORTH']);
  });
  // move a robot
  it('should be able to move a robot', () => {
    expect(handleMove([0, 0], [0, 1])).to.eql([0, 1]);
  });
  // turn a robot left
  it('should be able to turn a robot left', () => {
    expect(handleLeft()).to.equal(true);
  });
  // turn a robot right
  it('should be able to turn a robot right', () => {
    expect(handleRight()).to.equal(true);
  });
  // report a robot
  it('should be able to report a robot', () => {
    expect(handleReport([0, 1], [1, 2])).to.eql(['1, 2', 'NORTH']);
  });
  // Select a robot
  it('should be able to select a robot', () => {
    expect(handleRobot('ROBOT 1')).to.equal(true);
  });
  it('should be able to place a second robot', () => {
    expect(handlePlace('PLACE 3,2,WEST')).to.eql(['3, 2', 'WEST']);
  });
  it('should be able to select the old robot', () => {
    expect(handleRobot('ROBOT 1')).to.eql(true);
  });
});
