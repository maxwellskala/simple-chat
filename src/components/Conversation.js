import React from 'react';
import PropTypes from 'prop-types';

function Conversation({ messages, user }) {
  return (
    <div>
      {messages.map(message => {
        const floatSide = message.sender === user
          ? 'right'
          : 'left';
        return <div style={{ float: floatSide }}>message.text</div>;
      })}
    </div>
  );
};

Conversation.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.string.isRequired
};

export default Conversation;
