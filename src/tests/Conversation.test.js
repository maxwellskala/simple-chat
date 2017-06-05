import React from 'react';

import Conversation from '../components/Conversation';
import UserMessage from '../components/UserMessage';
import { wrap } from './utils';
import * as Usernames from '../constants/Usernames';
import * as MessagePositions from '../constants/MessagePositions';

const conversationId = '1';

const messages = [
  { text: 'Test 1', sender: Usernames.NAS, conversationId },
  { text: 'Test 2', sender: Usernames.JAYZ, conversationId },
  { text: 'Test 3', sender: Usernames.JAYZ, conversationId }
];

const DEFAULT_PROPS = { user: Usernames.NAS, messages };


describe('<Conversation />', () => {
  it('renders one UserMessage per entry in props.message', () => {
    const wrapped = wrap(<Conversation {...DEFAULT_PROPS} />);
    expect(wrapped.find(UserMessage).length).toEqual(messages.length);
  });

  it('renders UserMessages on the LEFT if they are from another user', () => {
    const wrapped = wrap(<Conversation {...DEFAULT_PROPS} />);
    wrapped.find(UserMessage).forEach((userMessage, index) => {
      if (messages[index].sender !== DEFAULT_PROPS.user) {
        expect(userMessage.prop('side')).toEqual(MessagePositions.LEFT);
      }
    });
  });

  it('renders UserMessages on the RIGHT if they are from the logged-in user', () => {
    const wrapped = wrap(<Conversation {...DEFAULT_PROPS} />);
    wrapped.find(UserMessage).forEach((userMessage, index) => {
      if (messages[index].sender === DEFAULT_PROPS.user) {
        expect(userMessage.prop('side')).toEqual(MessagePositions.RIGHT);
      }
    });
  });
});
