import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../assets/api';
import { AsyncStorage, View } from 'react-native';
import { Text } from 'react-native-elements';

import NavBar from '../components/NavBar';

const api = new Api();
const { getUserInfo } = api;

class Dashboard extends Component {

  componentDidMount() {
    AsyncStorage.getItem('id').then(userid => {
      getUserInfo(userid, this.setUser)
    })
  }

  setUser = (user) => {
    console.log('SETTING USER', user)
    this.props.setUser(user)
  }

  render() {

    const { navigation } = this.props;

    return (
      <View>
        <NavBar navigation={navigation} />
        <Text>
          Dashboard Screen
        </Text>
      </View>
    )

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      const action = { type: 'SET_USER', user }
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(Dashboard);
