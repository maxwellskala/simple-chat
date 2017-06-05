import React from 'react';
import PropTypes from 'prop-types';

function NewMessageInput({ onSend, onTextChange, currentText }) {
  return (
    <form onSubmit={onSend}>
      <label>
        Message:
        <input type="text" value={currentText} onChange={onTextChange} />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}

NewMessageInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  currentText: PropTypes.string
};

NewMessageInput.defaultProps = {
  currentText: ''
};

export default NewMessageInput;
