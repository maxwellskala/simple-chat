import React from 'react';
import PropTypes from 'prop-types';

import UserMessage from './UserMessage';
import * as MessagePositions from '../constants/MessagePositions';

function Conversation({ messages, user }) {
  return (
    <div>
      {messages.map(({ text, sender }) => {
        const side = sender === user
          ? MessagePositions.RIGHT
          : MessagePositions.LEFT;
        return <UserMessage key={text + side} text={text} side={side} />;
      })}
    </div>
  );
}

Conversation.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.string.isRequired
};

Conversation.defaultProps = {
  messages: []
};

export default Conversation;
