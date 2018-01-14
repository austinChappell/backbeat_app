import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';

class DashboardScreen extends Component {
  render() {
    return (
      <Container>
        <Text>
          Welcome, {this.props.user.first_name}!
        </Text>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(DashboardScreen);
