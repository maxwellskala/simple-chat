import * as ActionTypes from '../constants/ActionTypes';

const user = (state = null, action) => {
  switch (action.type) {
    case (ActionTypes.UPDATE_USER):
      return action.payload.user;
    default:
      return state;
  }
};

export default user;
