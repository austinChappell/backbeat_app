import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../assets/api';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { Text } from 'react-native-elements';
import { colors, styles } from '../assets/styles';

import NavBar from '../components/NavBar';

const api = new Api();
const { getUserInfo } = api;

class Dashboard extends Component {

  state = {
    loading: true,
  }

  componentDidMount() {
    AsyncStorage.getItem('id').then(userid => {
      getUserInfo(userid, this.setUser)
    })
    AsyncStorage.getItem('auth_token').then((token) => {
      this.props.setToken(token)
    })
  }

  setUser = (user) => {
    console.log('SETTING USER', user)
    this.props.setUser(user)
    this.setState({ loading: false })
  }

  render() {

    const { navigation } = this.props;

    const content = this.state.loading ?
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
    :
    <View>
      <NavBar navigation={navigation} />
      <Text>
        Dashboard Screen
      </Text>
    </View>


    return (
      content
    )

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      const action = { type: 'SET_USER', user }
      dispatch(action)
    },

    setToken: (token) => {
      const action = { type: 'SET_TOKEN', token }
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(Dashboard);
