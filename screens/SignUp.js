import React, { Component } from 'react';
import { Button, Card, FormInput, FormLabel } from 'react-native-elements';
import { Text, View } from 'react-native';
import { colors, styles } from '../assets/styles';
import FBSDK, { GraphRequest, GraphRequestManager, LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

import FadeInView from '../components/FadeInView';

class SignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    password: '',
    username: '',
  }

  handleInputChange = (val, key) => {
    const o = {};
    o[key] = val;
    this.setState(o);
  }

  // handleSignUpWithFacebookButton() {
  //   // Attempt a login using the Facebook login dialog asking for default permissions.
  //   LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
  //     (result) => {
  //       if (result.isCancelled) {
  //         console.log('Login with facebook was cancelled');
  //       } else {
  //         AccessToken.getCurrentAccessToken().then((data) => {
  //           console.log('DATA ', data);
  //           console.log('ACCESS TOKEN ', data.accessToken);
  //           this.props.facebookAuth(data.accessToken);
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.log(`Login fail with error: ${error}`);
  //     },
  //   );
  // }

  signUp = () => {

  }

  render() {

    const { navigation } = this.props;

    return (
      <View style={ styles.container }>
        <FadeInView>

          <Card>
            <FormLabel>First Name</FormLabel>
            <FormInput
              onChangeText={(val) => this.handleInputChange(val, 'firstName')}
              value={this.state.firstName}
            />
            <FormLabel>Last Name</FormLabel>
            <FormInput
              onChangeText={(val) => this.handleInputChange(val, 'lastName')}
              value={this.state.lastName}
            />
            <FormLabel>Username</FormLabel>
            <FormInput
              onChangeText={(val) => this.handleInputChange(val, 'username')}
              value={this.state.username}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              onChangeText={(val) => this.handleInputChange(val, 'password')}
              secureTextEntry={true}
              value={this.state.password}
            />
            <Button
              backgroundColor={colors.primary}
              disabled={this.state.loading}
              disabledStyle={{ backgroundColor: colors.primaryDisabled }}
              loading={this.state.loading}
              color={colors.white}
              buttonStyle={ styles.button }
              title="Sign Up"
              onPress={this.signUp}
            />
          </Card>

          <Text style={{ marginTop: 20, textAlign: 'center' }}>
            Already have an account?
          </Text>

          <Button
            backgroundColor={'transparent'}
            color={colors.primary}
            title="Sign In"
            onPress={() => navigation.goBack()}
          />

          {/* <Button
            backgroundColor={'transparent'}
            color={colors.primary}
            title="Sign In with Facebook"
            onPress={this.handleSignUpWithFacebookButton}
          /> */}


          {/* <LoginButton
            readPermissions={['public_profile', 'email']}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert(`Login failed with error: ${result.error}`)
                } else if (result.isCancelled) {
                  alert('Login was cancelled')
                } else {
                  alert(`Login was successful with permissions ${result.grantedPermissions}`)
                  console.log('RESULTS', result)
                  AccessToken.getCurrentAccessToken().then(data => console.log(data))
                }
              }
            }
            onLogoutFinished={() => alert('User logged out')}
          /> */}

          <LoginButton
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {

                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      let accessToken = data.accessToken
                      alert(accessToken.toString())

                      const responseInfoCallback = (error, result) => {
                        if (error) {
                          console.log(error)
                          alert('Error fetching data: ' + error.toString());
                        } else {
                          console.log(result)
                          alert('Success fetching data: ' + result.toString());
                        }
                      }

                      const infoRequest = new GraphRequest(
                        '/me',
                        {
                          accessToken: accessToken,
                          parameters: {
                            fields: {
                              string: 'email,name,first_name,middle_name,last_name'
                            }
                          }
                        },
                        responseInfoCallback
                      );

                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start()

                    }
                  )

                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/>

        </FadeInView>
      </View>
    )

  }
}

export default SignUp;
