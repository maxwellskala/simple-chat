import * as ActionTypes from '../constants/ActionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_MESSAGE:
      return state.concat([action.payload.message]);
    case ActionTypes.RECEIVE_MESSAGE_HISTORY:
      return state.concat(action.payload.messages);
    default:
      return state;
  }
};

export default messages;
