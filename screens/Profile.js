import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { AsyncStorage, View } from 'react-native';

import GoBackNavBar from '../components/GoBackNavBar';
import Api from '../assets/api';

const api = new Api()
const { getProfile } = api;
// const user = {}
//
// AsyncStorage.getItem('firstName').then(value => user.firstName = value)
// AsyncStorage.getItem('lastName').then(value => user.lastName = value)

class Profile extends Component {

  render() {

    const { user } = this.props;

    console.log('PROPS', this.props)
    console.log('USER', user)

    const { navigation } = this.props;

    return (
      <View>
        <GoBackNavBar navigation={navigation} logoutButton={true} />
        <Text>
          Hello, {user.first_name} {user.last_name}
        </Text>
      </View>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Profile);
