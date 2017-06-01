import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: []
    };

    this.success = this.success.bind(this);
  };

  success(m) {
    console.log('receiving PubNub message');
    this.setState(prevState => ({
      message: prevState.concat([m])
    }));
  };

  componentWillMount() {
    const { pubNub } = this.props;
    pubNub.addListener({
      message: (m) => this.success(m)
    });
    pubNub.subscribe({
      channels: ['chat']
    });
  };

  render() {
    return <div>Hello world! You are logged in as {this.props.username}.</div>;
  };
};

App.propTypes = {
  pubNub: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

export default App;
