import React from 'react';
import PropTypes from 'prop-types';

const CHANNEL = 'chat';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMessage: '',
      messages: []
    };

    this.handleMessageReceive = this.handleMessageReceive.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
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
  };

  handleMessageChange(e) {
    const message = e.target.value;
    this.setState(prevState => ({
      currentMessage: message
    }));
  };

  renderMessages() {
    return this.state.messages.map(message => (
      <span key={message}>{message}</span>
    ));
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

  render() {
    const { currentMessage } = this.state;
    return (
      <div>
        <h3>You are logged in as {this.props.username}.</h3>
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
  pubNub: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

export default App;
