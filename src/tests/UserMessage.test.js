import React from 'react';

import UserMessage from '../components/UserMessage';
import { wrap } from './utils';
import * as MessagePositions from '../constants/MessagePositions';

const text = 'Test';
const DEFAULT_PROPS = {
  text,
  side: MessagePositions.LEFT
};
const style = { textAlign: MessagePositions.LEFT };

describe('<UserMessage />', () => {
  it('uses props.side to set style appropriately', () => {
    const wrapped = wrap(<UserMessage {...DEFAULT_PROPS} />);
    expect(wrapped.prop('style')).toEqual(style);
  });
});
