import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { AsyncStorage, Text, View } from 'react-native';
// import FBSDK, { GraphRequest, GraphRequestManager, LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

import { colors, styles } from '../assets/styles';
import FadeInView from '../components/FadeInView';
import AuthAPI from '../assets/APIs/authAPI';
import Api from '../assets/api';
import { onSignIn } from '../auth';

const api = new Api();
const authAPI = new AuthAPI();
const { getUserInfo } = api;
const { checkFBToken, registerFB } = authAPI;

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired,
};

class SignInType extends Component {
  enterSite = user => {
    this.props.setUser(user);
    onSignIn(this.token).then(() => this.props.navigation.navigate('SignedIn'));
  };

  // handleSignUpWithFacebookButton = () => {
  //   // Attempt a login using the Facebook login dialog asking for default permissions.
  //   LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
  //     (result) => {
  //       if (result.isCancelled) {
  //         console.log('Login with facebook was cancelled');
  //       } else {
  //         AccessToken.getCurrentAccessToken().then((data) => {
  //           const { accessToken } = data;

  //           const responseInfoCallback = (err, result) => {
  //             if (err) {
  //               console.error(err)
  //               alert(`Error logging in ${error.toString()}`)
  //             } else {
  //               this.user = {
  //                 first_name: result.first_name,
  //                 last_name: result.last_name,
  //                 email: result.email,
  //                 city: 'Dallas, TX',
  //                 oauth_id: result.id,
  //                 access_token: accessToken
  //               }
  //               this.signIn(this.user)
  //             }
  //           }

  //           const infoRequest = new GraphRequest('/me', {
  //             accessToken,
  //             parameters: {
  //               fields: {
  //                 string: 'email,name,first_name,last_name,id'
  //               }
  //             }
  //           }, responseInfoCallback)

  //           new GraphRequestManager().addRequest(infoRequest).start()

  //         });
  //       }
  //     },
  //     (error) => {
  //       console.log(`Login fail with error: ${error}`);
  //     },
  //   );
  // }

  setUser = results => {
    const user = results.rows[0];
    if (user) {
      this.token = user.token;
      getUserInfo(user.id, user.token, this.enterSite);
    } else {
      this.signUp(this.user);
    }
  };

  signIn = user => {
    checkFBToken(user, this.setUser);
  };

  signUp = user => {
    registerFB(user, this.setUser);
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FadeInView>
          <Text style={styles.header}>The Back Beat</Text>
          {/* <Button
            backgroundColor={colors.facebook}
            buttonStyle={styles.button}
            color={colors.white}
            icon={{ color: 'white', type: 'font-awesome', name: 'facebook', size: 24 }}
            large
            title="Login with Facebook"
            onPress={this.handleSignUpWithFacebookButton}
          /> */}
          <Button
            backgroundColor={colors.google}
            buttonStyle={styles.button}
            color={colors.white}
            icon={{ color: 'white', type: 'font-awesome', name: 'google-plus', size: 24 }}
            large
            title="Login with Google"
            onPress={this.handleSignUpWithFacebookButton}
          />
          <Button
            backgroundColor={colors.linkedin}
            buttonStyle={styles.button}
            color={colors.white}
            icon={{ color: 'white', type: 'font-awesome', name: 'linkedin', size: 24 }}
            large
            title="Login with LinkedIn"
            onPress={this.handleSignUpWithFacebookButton}
          />
          <Button
            backgroundColor={colors.primary}
            buttonStyle={styles.button}
            color={colors.white}
            large
            title="Login with Email Address"
            onPress={() => navigation.navigate('SignIn')}
          />
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

SignInType.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(SignInType);
