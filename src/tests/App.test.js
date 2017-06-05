import React from 'react';

import App from '../containers/App';
import Conversation from '../components/Conversation';
import NewMessageInput from '../components/NewMessageInput';
import { emptyFunc, wrap, wrapAndSetState } from './utils';
import * as Usernames from '../constants/Usernames';

const pubNub = {
  addListener: emptyFunc,
  subscribe: emptyFunc,
  history: emptyFunc,
  publish: emptyFunc,
  setUUID: emptyFunc
};

const DEFAULT_PROPS = { pubNub };

describe('<App />', () => {
  it('renders user choice selection if no user in state', () => {
    const wrapped = wrap(<App {...DEFAULT_PROPS} />);
    expect(wrapped.find('button').length).toEqual(2);
    expect(wrapped.find('h3').text()).toEqual('Choose your user');
  });

  it('updates user state on click of user choice', () => {
    const wrapped = wrap(<App {...DEFAULT_PROPS} />);
    expect(wrapped.state('user')).toEqual(null);
    const nasButton = wrapped.findWhere(child => (
      child.type() === 'button' && child.text() === 'Nas'
    ));
    nasButton.simulate('click');
    expect(wrapped.state('user')).toEqual(Usernames.NAS);
  });

  it('renders loading message if state.user && state.historyFetched === false', () => {
    const wrapped = wrap(<App {...DEFAULT_PROPS} />);
    const expectedNasText = 'Welcome back Nasir Jones. Fetching your chat history...';
    expect(wrapped.findWhere(child => child.text() === expectedNasText).length)
      .toEqual(0);
    wrapped.setState({ user: Usernames.NAS });
    expect(wrapped.findWhere(child => child.text() === expectedNasText).length)
      .toEqual(1);
  });

  it('renders one Conversation if state.user and state.historyFetched', () => {
    const wrapped = wrap(<App {...DEFAULT_PROPS} />);
    expect(wrapped.find(Conversation).length).toEqual(0);
    wrapped.setState({ user: Usernames.NAS, historyFetched: true });
    expect(wrapped.find(Conversation).length).toEqual(1);
  });

  it('renders one NewMessageInput if state.user and state.historyFetched', () => {
    const wrapped = wrap(<App {...DEFAULT_PROPS} />);
    expect(wrapped.find(NewMessageInput).length).toEqual(0);
    wrapped.setState({ user: Usernames.NAS, historyFetched: true });
    expect(wrapped.find(NewMessageInput).length).toEqual(1);
  });

  xit('properly updates state.currentMessage when NewMessageInput is altered', () => {
    const wrapped = wrap(<App {...DEFAULT_PROPS} />);
    expect(wrapped.state('currentText')).toEqual('');
    const input = wrapped.children('input');
    const event = {
      target: {
        value: 'Test'
      }
    };
    input.simulate('change', event);
    expect(wrapped.state('currentText')).toEqual(event.target.value);
  });

  xit('resets state.currentText to empty string when message is sent', () => {
    const wrapped = wrapAndSetState(<App {...DEFAULT_PROPS} />, { currentText: 'Test' });
    const sendButton = wrapped.find(NewMessageInput).children('button');
    sendButton.simulate('click');
    expect(wrapped.state('currentText')).toEqual('');
  });
});
