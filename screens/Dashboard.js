import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { Text } from 'react-native-elements';

import Api from '../assets/api';
import UserAPI from '../assets/APIs/userAPI';
import { colors, styles } from '../assets/styles';
import { onSignOut } from '../auth';

import NavBar from '../components/NavBar';

const api = new Api();
const userAPI = new UserAPI();
const { getUserInfo } = api;
const { getAllUsers } = userAPI;

class Dashboard extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    // TODO: this setstate to false is tempory
    this.setState({ loading: false });
    AsyncStorage.getItem('id')
      .then((userid) => {
        this.userid = userid;
      })
      .then(() => {
        AsyncStorage.getItem('auth_token').then((token) => {
          this.props.setToken(token);
          getUserInfo(this.userid, token, this.setUser, this.logout);
          getAllUsers(token, this.printUsers);
        });
      });
  }

  printUsers = (results) => {
    console.log('PRINTING USERS', results);
  };

  logout = () => {
    onSignOut().then(() => this.props.navigation.navigate('SignedOut'));
  };

  setUser = (user) => {
    console.log('SETTING USER', user);
    this.props.setUser(user);
    this.setState({ loading: false });
  };

  render() {
    const { navigation } = this.props;

    console.log('NAVIGATION STATE', navigation.state);

    const content = this.state.loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    ) : (
      <View style={{ backgroundColor: colors.white, flexGrow: 1 }}>
        <NavBar navigation={navigation} />
        <View>
          <Text>Dashboard Screen</Text>
        </View>
      </View>
    );

    return content;
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    const action = { type: 'SET_USER', user };
    dispatch(action);
  },

  setToken: (token) => {
    const action = { type: 'SET_TOKEN', token };
    dispatch(action);
  },
});

export default connect(null, mapDispatchToProps)(Dashboard);
