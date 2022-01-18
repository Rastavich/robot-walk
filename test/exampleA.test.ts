import { handleMove, handlePlace, handleReport } from '../main';

import { expect } from 'chai';

describe('Example Input A)', () => {
  //place a robot
  it('should be able to place a robot', () => {
    expect(handlePlace('PLACE 0,0,NORTH')).to.eql(['0, 0', 'NORTH']);
  });
  // move a robot
  it('should be able to move a robot', () => {
    expect(handleMove([0, 0], [0, 1])).to.eql([0, 1]);
  });
  // report a robot
  it('should be able to report a robot', () => {
    expect(handleReport([0, 1], [0, 1])).to.eql(['0, 1', 'NORTH']);
  });
});
