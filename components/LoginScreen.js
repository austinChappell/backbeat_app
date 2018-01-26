import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Spinner, Text } from 'native-base';
import { Button } from 'react-native-elements';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { styles, color } from '../assets/styles';

import data from '../assets/data';

class LoginScreen extends Component {

  state = {
    loading: false,
    username: '',
    password: ''
  }

  handleChange = (text, key) => {
    const o = {};
    o[key] = text;
    this.setState(o);
  }

  login = () => {
    this.setState({ loading: true })
    const user = { username: this.state.username, password: this.state.password }
    console.log('USER', user);
    console.log('API URL', data.apiURL)
    fetch(`${data.apiURL}/login`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then((response) => {
      console.log('RESPONSE', response);
      if (!response.ok) {
        this.setState({ loading: false })
        Alert.alert(
          'Login Error',
          'Incorrect username/password',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        return response.json();
      }
    }).then((user) => {
      if (user) {
        console.log('USER', user);
        // AsyncStorage.setItem('token', user.token);
        this.props.setToken(user.token);
        this.setUser(user.token, user.userid);
        // this.props.history.push('/dashboard');
      }
    }).catch((err) => {
      console.error('LOGIN ERROR', err);
    })
  }

  setUser(token, id) {
    const { navigate } = this.props.navigation;
    const api = data.apiURL;
    const url = `${api}/myprofile/${id}`;
    fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token
      },
    }).then((response) => {
      return response.json();
    }).then((results) => {
      const user = results.rows[0];
      this.props.setUser(user, token);
      navigate('Dashboard');
    }).catch((err) => {
      console.error('ERROR SETTING USER', err);
    })
  }

  render() {
    console.log('STATE', this.state);
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item>
              <Input
                onChangeText={(text) => this.handleChange(text, 'username')}
                value={this.state.username}
                placeholder="username"
              />
            </Item>
            <Item>
              <Input
                onChangeText={(text) => this.handleChange(text, 'password')}
                value={this.state.password}
                secureTextEntry={true}
                placeholder="password"
              />
            </Item>
            <Button
              buttonStyle={styles.button}
              fontSize={20}
              onPress={this.login}
              title="Login"
              backgroundColor={color.secondaryDark}
              color={color.white}
            />
            <Text>
              {this.props.user.first_name}
            </Text>
          </Form>
        </Content>
        <Content style={this.state.loading ? styles.spinnerContainer : styles.hide}>
          <Spinner color={color.primary} />
        </Content>
      </Container>

      // <View>
      //   <Text>
      //     Login Screen
      //   </Text>
      // </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    setUser: (user) => {
      const action = { type: 'SET_USER', user };
      dispatch(action);
    },

    setToken: (token) => {
      const action = { type: 'SET_TOKEN', token };
      dispatch(action);
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
