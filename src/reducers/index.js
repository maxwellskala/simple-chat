import { combineReducers } from 'redux';
import currentText from './currentText';
import historyFetched from './historyFetched';
import messages from './messages';
import user from './user';

export default combineReducers({
  currentText,
  historyFetched,
  messages,
  user
});
