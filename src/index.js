import React from 'react';
import ReactDOM from 'react-dom';
import PubNub from 'pubnub';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// dev-specific hot loading stuff
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';
import reducer from './reducers';
import { PUBNUB_PUBLISH, PUBNUB_SUBSCRIBE } from './ApiKeys';

const pubNub = new PubNub({
  publish_key: PUBNUB_PUBLISH,
  subscribe_key: PUBNUB_SUBSCRIBE,
  ssl: true
});

const store = createStore(reducer);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component pubNub={pubNub} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App); });
}
