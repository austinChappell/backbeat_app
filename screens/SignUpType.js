import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { AsyncStorage, Text, View } from 'react-native';
import { colors, styles } from '../assets/styles';
// import FBSDK, { GraphRequest, GraphRequestManager, LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';
import FadeInView from '../components/FadeInView';
import AuthAPI from '../assets/APIs/authAPI';
import Api from '../assets/api';
import { onSignIn } from '../auth';

const api = new Api();
const authAPI = new AuthAPI();
const { getUserInfo } = api;
const { register } = authAPI;

console.log('button', Button);

class SignUpType extends Component {
  enterSite = (user) => {
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
  //               const user = {
  //                 first_name: result.first_name,
  //                 last_name: result.last_name,
  //                 email: result.email,
  //                 city: 'Dallas, TX'
  //               }
  //               this.signUp(user)
  //             }
  //           }

  //           const infoRequest = new GraphRequest('/me', {
  //             accessToken,
  //             parameters: {
  //               fields: {
  //                 string: 'email,name,first_name,last_name'
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

  setUser = (results) => {
    const user = results.rows[0];
    this.token = user.token;
    getUserInfo(user.id, user.token, this.enterSite);
  };

  signUp = (user) => {
    register(user, this.setUser);
  };

  render() {
    const { navigations } = this.props;

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
            title="Sign Up with Facebook"
            onPress={this.handleSignUpWithFacebookButton}
          /> */}
          <Button
            backgroundColor={colors.google}
            buttonStyle={styles.button}
            color={colors.white}
            icon={{
 color: 'white', type: 'font-awesome', name: 'google-plus', size: 24,
}}
            large
            title="Sign Up with Google"
            onPress={this.handleSignUpWithFacebookButton}
          />
          <Button
            backgroundColor={colors.linkedin}
            buttonStyle={styles.button}
            color={colors.white}
            icon={{
 color: 'white', type: 'font-awesome', name: 'linkedin', size: 24,
}}
            large
            title="Sign Up with LinkedIn"
            onPress={this.handleSignUpWithFacebookButton}
          />
          <Button
            backgroundColor={colors.primary}
            buttonStyle={styles.button}
            color={colors.white}
            large
            title="Sign Up with Email Address"
            onPress={this.handleSignUpWithFacebookButton}
          />
        </FadeInView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    const action = { type: 'SET_USER', user };
    dispatch(action);
  },
});

export default connect(null, mapDispatchToProps)(SignUpType);
