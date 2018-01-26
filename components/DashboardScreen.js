import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import Api from '../assets/api';

const api = new Api()

const { getProfile } = api;

class DashboardScreen extends Component {

  componentDidMount() {
    console.log('DASHBOARD PROPS', this.props)
    // const token = AsyncStorage.getItem('token');
    getProfile('mleague', this.props.token, this.showProfile)
  }

  showProfile = (profile) => {
    console.log('MIKE LEAGUE PROFILE', profile)
  }

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
    user: state.user.user,
    token: state.user.token
  }
}

export default connect(mapStateToProps)(DashboardScreen);
