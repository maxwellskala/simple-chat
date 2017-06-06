import * as ActionTypes from '../constants/ActionTypes';

const currentText = (state = '', action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_TEXT:
      return action.payload.text;
    case ActionTypes.SEND_MESSAGE:
      return '';
    default:
      return state;
  }
};

export default currentText;
