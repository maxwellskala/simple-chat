import React from 'react';
import ReactDOM from 'react-dom';
import PubNub from 'pubnub';

import App from './containers/App';
import * as Usernames from './constants/UserNames';
import { PUBNUB_PUBLISH, PUBNUB_SUBSCRIBE } from './ApiKeys';

function chooseUser() {
  return Math.floor(Math.random * 2) % 2 === 0
    ? Usernames.HOVA
    : Usernames.NASTRADAMUS;
};

const username = chooseUser();

const pubNub = new PubNub({
  publish_key: PUBNUB_PUBLISH,
  subscribe_key: PUBNUB_SUBSCRIBE,
  ssl: true,
  uuid: username
});

ReactDOM.render(
  <App pubNub={pubNub} username={username} />,
  document.getElementById('root')
);
