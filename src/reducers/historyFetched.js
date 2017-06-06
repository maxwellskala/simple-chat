import * as ActionTypes from '../constants/ActionTypes';

const historyFetched = (state = false, action) => {
  switch (action.type) {
    case (ActionTypes.RECEIVE_MESSAGE_HISTORY):
      return true;
    default:
      return state;
  }
};

export default historyFetched;
