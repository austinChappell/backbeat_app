import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container } from 'native-base';
import { Button } from 'react-native-elements';
import { navigate, navigationOptions } from 'react-navigation';
import { styles, color } from '../assets/styles';

import FadeInView from './FadeInView';

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home Page'
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.containerLoggedOut}>
        <FadeInView>
          <Text style={styles.header}>The Back Beat</Text>
          <Text style={styles.subHeader}>Connecting musicians{"\n"}in a digital age.</Text>
          <Button
            buttonStyle={styles.button}
            fontSize={20}
            onPress={() => navigate('Login')}
            title="Login"
            backgroundColor={color.secondaryDark}
            color={color.white}
          />
          <Button
            large
            onPress={() => navigate('Signup')}
            title="Sign Up"
            backgroundColor={color.white}
            color={color.secondaryDark}
          />
        </FadeInView>
      </Container>
    )
  }
}

export default HomeScreen;
