import {
  getFacingDirection,
  handleMove,
  handlePlace,
  handleLeft,
  handleRight,
  handleReport,
  handleRobot,
} from '../main';

import { expect } from 'chai';

describe('Tests', () => {
  //place a robot
  it('should be able to place a robot', () => {
    expect(handlePlace('PLACE 0,0,NORTH')).to.eql([[0, 0], 'NORTH']);
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
    expect(handleReport([0, 1])).to.eql('NORTH');
  });
  // Select a robot
  it('should be able to select a robot', () => {
    expect(handleRobot('ROBOT 1')).to.equal(true);
  });
});
