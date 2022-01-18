import { handleMove, handlePlace, handleLeft, handleReport } from '../main';

import { expect } from 'chai';

describe('Example Input B)', () => {
  //place a robot
  it('should be able to place a robot', () => {
    expect(handlePlace('PLACE 0,0,NORTH')).to.eql(['0, 0', 'NORTH']);
  });
  // move a robot
  it('should be able to move a robot', () => {
    expect(handleMove([0, 0], [0, 1])).to.eql([0, 1]);
  });
  // turn a robot left
  it('should be able to turn a robot left', () => {
    expect(handleLeft()).to.equal(true);
  });
  // report a robot
  it('should be able to report a robot', () => {
    expect(handleReport([-1, 0], [0, 1])).to.eql(['0, 1', 'WEST']);
  });
});
