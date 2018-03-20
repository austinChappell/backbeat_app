import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, FormLabel, FormInput } from 'react-native-elements';
import { Text, View } from 'react-native';

import Api from '../assets/api';
import { onSignIn } from '../auth';
import { colors, styles } from '../assets/styles';

import FadeInView from '../components/FadeInView';

const api = new Api();
const { getUserInfo, login } = api;

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  setUser: PropTypes.func.isRequired,
};

class SignIn extends Component {
  state = {
    loading: false,
    password: '',
    email: '',
  };

  enterSite = user => {
    console.log('ENTERING THE SITE WITH USER', user);
    this.props.setUser(user);
    onSignIn(this.token).then(() => this.props.navigation.navigate('SignedIn'));
  };

  getUser = results => {
    const { user, token } = results;
    this.token = token;
    getUserInfo(user.id, token, this.enterSite);
  };

  handleInputChange = (val, key) => {
    const o = {};
    o[key] = val;
    this.setState(o);
  };

  signIn = () => {
    this.setState({ loading: true }, () => {
      const { email, password } = this.state;
      const credentials = { email: email.toLowerCase(), password };
      login(credentials, this.getUser);
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FadeInView>
          <Text style={styles.header}>The Back Beat</Text>
          <Text style={styles.subHeader}>Connecting musicians in a digital age.</Text>
          <Card>
            <FormLabel>Email</FormLabel>
            <FormInput
              onChangeText={val => this.handleInputChange(val, 'email')}
              value={this.state.email}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry={true}
              onChangeText={val => this.handleInputChange(val, 'password')}
              value={this.state.password}
            />
            <Button
              backgroundColor={colors.primary}
              disabled={this.state.loading}
              disabledStyle={{ backgroundColor: colors.primaryDisabled }}
              loading={this.state.loading}
              color={colors.white}
              buttonStyle={styles.button}
              title="Sign In"
              onPress={this.signIn}
            />
            <Text style={{ textAlign: 'center' }}>Need an account?</Text>
            <Button
              backgroundColor={'transparent'}
              color={colors.primary}
              title="Sign Up"
              onPress={() => navigation.navigate('SignUp')}
            />
          </Card>
        </FadeInView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      const action = { type: 'SET_USER', user };
      dispatch(action);
    },
  };
};

SignIn.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(SignIn);
