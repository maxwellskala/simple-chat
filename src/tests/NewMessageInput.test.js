import React from 'react';

import NewMessageInput from '../components/NewMessageInput';
import { emptyFunc, wrap } from './utils';

const currentText = 'Test';
const DEFAULT_PROPS = {
  onSend: emptyFunc,
  onTextChange: emptyFunc,
  currentText
};

describe('<NewMessageInput />', () => {
  it('renders props.currentText to input value', () => {
    const wrapped = wrap(<NewMessageInput {...DEFAULT_PROPS} />);
    expect(wrapped.find('input').prop('value')).toEqual(currentText);
  });
});
