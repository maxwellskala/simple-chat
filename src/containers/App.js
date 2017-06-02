import React from 'react';
import PropTypes from 'prop-types';
import * as Usernames from '../constants/Usernames';

const CHANNEL = 'chat';

function getOtherUser(user) {
  return user === Usernames.NAS
    ? Usernames.JAYZ
    : Usernames.NAS;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      currentMessage: '',
      messages: []
    };

    this.handleMessageReceive = this.handleMessageReceive.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
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
    const text = m.message;
    this.setState(prevState => ({
      messages: prevState.messages.concat([text])
    }));
  };

  handleMessageSend(e) {
    const { pubNub } = this.props;
    const { currentMessage } = this.state;
    pubNub.publish(
      {
        channel: CHANNEL,
        message: currentMessage
      },
      (status, response) => console.log(status, response)
    );
    this.setState({ currentMessage: '' });
  };

  handleMessageChange(e) {
    const message = e.target.value;
    this.setState(prevState => ({
      currentMessage: message
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
    return this.state.messages.map(message => (
      <div key={message}>{message}</div>
    ));
  };

  render() {
    const { user, currentMessage } = this.state;
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
            value={currentMessage}
            onChange={this.handleMessageChange}
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
