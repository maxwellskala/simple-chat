import React from 'react';
import PropTypes from 'prop-types';

import * as MessagePositions from '../constants/MessagePositions';

function UserMessage({ text, side }) {
  const style = { textAlign: side };
  return <div style={style}>{text}</div>;
}

UserMessage.propTypes = {
  text: PropTypes.string.isRequired,
  side: PropTypes.oneOf([
    MessagePositions.RIGHT,
    MessagePositions.LEFT
  ]).isRequired
};

export default UserMessage;
