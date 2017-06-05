import React from 'react';

import { wrap, wrapAndSetState } from './utils';

function emptyFunc() {
  return null;
}

const PUBNUB = {
  addListener: emptyFunc,
  subscribe: emptyFunc,
  history: emptyFunc,
  publish: emptyFunc,
  setUUID: emptyFunc
};

describe('<App />', () => {
  xit('renders user choice selection if no user in state', () => {
    return;
  });

  xit('updates user state on click of user choice', () => {
    return;
  });

  xit('renders loading message if state.historyFetched === false', () => {
    return;
  });

  xit('renders one Conversation if state.user and state.historyFetched', () => {
    return;
  });

  xit('renders on NewMessageInput if state.user and state.historyFetched', () => {
    return;
  });

  xit('properly updates state.currentMessage when NewMessageInput is altered', () => {
    return;
  });

  xit('resets state.currentText to empty string when message is sent', () => {
    return;
  });
});
