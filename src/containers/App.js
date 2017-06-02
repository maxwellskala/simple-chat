import React from 'react';
import PropTypes from 'prop-types';
import * as Usernames from '../constants/Usernames';

const CHANNEL = 'chat';
const CONVERSATION_ID = '1';

function getOtherUser(user) {
  return user === Usernames.NAS
    ? Usernames.JAYZ
    : Usernames.NAS;
};

function getMessage(text, username, conversationId) {
  return {
    text,
    sender: username,
    conversationId
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      currentText: '',
      messages: []
    };

    this.handleMessageReceive = this.handleMessageReceive.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.getHandleUserChoice = this.getHandleUserChoice.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  };

  componentWillMount() {
    const { pubNub } = this.props;
    pubNub.addListener({
      message: this.handleMessageReceive
    });
    pubNub.subscribe({
      channels: [CHANNEL]
    });
  };

  handleMessageReceive(m) {
    this.setState(prevState => ({
      messages: prevState.messages.concat([m])
    }));
  };

  handleMessageSend(e) {
    const { pubNub } = this.props;
    const { currentText, user } = this.state;
    pubNub.publish(
      {
        channel: CHANNEL,
        message: getMessage(currentText, user, CONVERSATION_ID)
      },
      (status, response) => console.log(status, response)
    );
    this.setState({ currentText: '' });
  };

  handleTextChange(e) {
    const message = e.target.value;
    this.setState(prevState => ({
      currentText: message
    }));
  };

  getHandleUserChoice(username) {
    return (e) => {
      this.props.pubNub.setUUID(username);
      this.setState({ user: username });
    };
  };

  renderUserChoice() {
    return (
      <div>
        <h3>Choose your user</h3>
        <button onClick={this.getHandleUserChoice(Usernames.NAS)}>
          Nas
        </button>
        <button onClick={this.getHandleUserChoice(Usernames.JAYZ)}>
          Jay-Z
        </button>
      </div>
    );
  };

  renderMessages() {
    return this.state.messages.map(({ message }) => (
      <div key={message.text}>{message.text}</div>
    ));
  };

  render() {
    const { user, currentText } = this.state;
    if (!user) {
      return this.renderUserChoice();
    }
    const otherUser = getOtherUser(user);
    return (
      <div>
        <h3>You are logged in as {user} in a conversation with {otherUser}.</h3>
        {this.renderMessages()}
        <label>
          Message:
          <input
            type="text"
            value={currentText}
            onChange={this.handleTextChange}
          />
          <button onClick={this.handleMessageSend}>Send</button>
        </label>
      </div>
    );
  };
};

App.propTypes = {
  pubNub: PropTypes.object.isRequired
};

export default App;
