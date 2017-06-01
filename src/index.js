import React from 'react';
import ReactDOM from 'react-dom';
import PubNub from 'pubnub';

import App from './containers/App';
import { PUBNUB_PUBLISH, PUBNUB_SUBSCRIBE } from './ApiKeys';

ReactDOM.render(<App />, document.getElementById('root'));
