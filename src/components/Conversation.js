import React from 'react';
import PropTypes from 'prop-types';

function Conversation({ messages, user }) {
  return (
    <div>
      {messages.map(({text, sender, conversationId})=> {
        const side = sender === user
          ? 'right'
          : 'left';
        const style = { position: 'fixed', [side]: 0 };
        return <div key={sender + text} style={style}>{text}</div>;
      })}
    </div>
  );
};

Conversation.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.string.isRequired
};

export default Conversation;
