import { handleMove, handlePlace, handleLeft, handleReport } from '../main';

import { expect } from 'chai';

describe('Example Input C)', () => {
  //place a robot
  it('should be able to place a robot', () => {
    expect(handlePlace('PLACE 1,2,EAST')).to.eql(['1, 2', 'EAST']);
  });
  // move a robot
  it('should be able to move a robot', () => {
    expect(handleMove([1, 2], [1, 0])).to.eql([2, 2]);
  });
  // move a robot
  it('should be able to move a robot', () => {
    expect(handleMove([2, 2], [1, 0])).to.eql([3, 2]);
  });
  // turn a robot left
  it('should be able to turn a robot left', () => {
    expect(handleLeft()).to.equal(true);
  });
  // move a robot
  it('should be able to move a robot', () => {
    expect(handleMove([3, 2], [0, 1])).to.eql([3, 3]);
  });
  // report a robot
  it('should be able to report a robot', () => {
    expect(handleReport([0, 1], [3, 3])).to.eql(['3, 3', 'NORTH']);
  });
});
