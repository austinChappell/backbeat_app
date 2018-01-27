import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Card, FormLabel, FormInput } from 'react-native-elements';
import { View } from 'react-native';

import Api from '../assets/api';
import { onSignIn } from '../auth';
import { colors } from '../assets/styles';

const api = new Api()
const { getUserInfo, login } = api;

class SignIn extends Component {

  state = {
    loading: false,
    password: '',
    username: '',
  }

  enterSite = (user) => {
    this.props.setUser(user[0])
    onSignIn(this.token).then(() => this.props.navigation.navigate('SignedIn'))
  }

  getUser = (results) => {
    const { userid, token } = results;
    console.log('ID', userid)
    console.log('TOKEN', token)
    this.token = token;
    getUserInfo(userid, this.enterSite)
  }

  handleInputChange = (val, key) => {
    const o = {}
    o[key] = val;
    this.setState(o)
  }

  signIn = () => {
    this.setState({ loading: true }, () => {
      const { username, password } = this.state;
      const credentials = { username, password }
      login(credentials, this.getUser)
    })
  }

  render() {

    const { navigation } = this.props;

    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Username</FormLabel>
          <FormInput
            onChangeText={(val) => this.handleInputChange(val, 'username')}
            value={this.state.username}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            onChangeText={(val) => this.handleInputChange(val, 'password')}
            value={this.state.password}
          />
          <Button
            backgroundColor={colors.primary}
            disabled={this.state.loading}
            disabledStyle={{ backgroundColor: colors.primaryDisabled }}
            loading={this.state.loading}
            color={colors.white}
            title="Sign In"
            onPress={this.signIn}
          />
        </Card>
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

export default connect(null, mapDispatchToProps)(SignIn);
