import React, { Component } from 'react';
import { Button, Card, FormInput, FormLabel } from 'react-native-elements';
import { AsyncStorage, Text, View } from 'react-native';
import { colors, styles } from '../assets/styles';

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

        </FadeInView>
      </View>
    )

  }
}

export default SignUp;
