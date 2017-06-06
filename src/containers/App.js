import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Conversation from '../components/Conversation';
import NewMessageInput from '../components/NewMessageInput';
import {
  updateUser,
  updateCurrentText
} from '../actions';
import * as Usernames from '../constants/Usernames';

const CHANNEL = 'chat';
const CONVERSATION_ID = '1';

function getOtherUser(user) {
  return user === Usernames.NAS
    ? Usernames.JAYZ
    : Usernames.NAS;
}

function getMessage(text, username, conversationId) {
  return {
    text,
    sender: username,
    conversationId
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      historyFetched: false
    };

    this.handleMessageReceive = this.handleMessageReceive.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.getHandleUserChoice = this.getHandleUserChoice.bind(this);
    this.renderLoadingHistory = this.renderLoadingHistory.bind(this);
  }

  componentWillMount() {
    const { pubNub } = this.props;
    pubNub.addListener({
      message: this.handleMessageReceive
    });
    pubNub.subscribe({
      channels: [CHANNEL]
    });
  }

  componentDidMount() {
    const { pubNub } = this.props;
    pubNub.history(
      {
        channel: CHANNEL,
        count: 25
      },
      (status, response) => {
        const messages = response.messages
          .filter(message => !!message.entry)
          .map(({ entry }) => (
            getMessage(entry.text, entry.sender, entry.conversationId)
          ));
        this.setState({ historyFetched: true, messages });
      }
    );
  }

  handleMessageReceive(m) {
    this.setState(prevState => ({
      messages: prevState.messages.concat([m.message])
    }));
  }

  handleMessageSend(e) {
    const {
      pubNub,
      user,
      currentText,
      onUpdateCurrentText
    } = this.props;
    e.preventDefault();
    pubNub.publish({
      channel: CHANNEL,
      message: getMessage(currentText, user, CONVERSATION_ID)
    });
    onUpdateCurrentText('');
  }

  handleTextChange(e) {
    const text = e.target.value;
    this.props.onUpdateCurrentText(text);
  }

  getHandleUserChoice(username) {
    const { pubNub, onUpdateUser } = this.props;
    return () => {
      pubNub.setUUID(username);
      onUpdateUser(username);
    };
  }

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
  }

  renderLoadingHistory() {
    const { user } = this.props;
    return <div>Welcome back {user}. Fetching your chat history...</div>;
  }

  render() {
    const { historyFetched, messages } = this.state;
    const { currentText, user } = this.props;
    if (!user) {
      return this.renderUserChoice();
    }
    if (!historyFetched) {
      return this.renderLoadingHistory();
    }
    const otherUser = getOtherUser(user);
    return (
      <div>
        <h3>You are logged in as {user} in a conversation with {otherUser}.</h3>
        <Conversation messages={messages} user={user} />
        <NewMessageInput
          onSend={this.handleMessageSend}
          onTextChange={this.handleTextChange}
          currentText={currentText}
        />
      </div>
    );
  }
}

App.propTypes = {
  pubNub: PropTypes.object.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onUpdateCurrentText: PropTypes.func.isRequired,
  user: PropTypes.string,
  currentText: PropTypes.string
};

App.defaultProps = {
  user: null,
  currentText: ''
};

const mapStateToProps = state => ({
  user: state.user,
  currentText: state.currentText
});

const mapDispatchToProps = dispatch => ({
  onUpdateUser: user => dispatch(updateUser(user)),
  onUpdateCurrentText: text => dispatch(updateCurrentText(text))
});

const connected = connect(mapStateToProps, mapDispatchToProps)(App);

export default connected;
