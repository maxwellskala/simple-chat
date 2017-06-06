import * as ActionTypes from '../constants/ActionTypes';

export const updateUser = username => ({
  type: ActionTypes.UPDATE_USER,
  payload: {
    user: username
  }
});

export const updateCurrentText = text => ({
  type: ActionTypes.UPDATE_CURRENT_TEXT,
  payload: {
    text
  }
});

export const sendMessage = message => ({
  type: ActionTypes.SEND_MESSAGE,
  payload: {
    message
  }
});

export const receiveMessage = message => ({
  type: ActionTypes.RECEIVE_MESSAGE,
  payload: {
    message
  }
});

export const requestMessageHistory = () => ({
  type: ActionTypes.REQUEST_MESSAGE_HISTORY
});

export const receiveMessageHistory = messages => ({
  type: ActionTypes.RECEIVE_MESSAGE_HISTORY,
  payload: {
    messages
  }
});
