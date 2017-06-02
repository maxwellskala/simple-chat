import React from 'react';
import ReactDOM from 'react-dom';
import PubNub from 'pubnub';

import App from './containers/App';
import * as Usernames from './constants/Usernames';
import { PUBNUB_PUBLISH, PUBNUB_SUBSCRIBE } from './ApiKeys';

const pubNub = new PubNub({
  publish_key: PUBNUB_PUBLISH,
  subscribe_key: PUBNUB_SUBSCRIBE,
  ssl: true
});

ReactDOM.render(
  <App pubNub={pubNub} />,
  document.getElementById('root')
);
