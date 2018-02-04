import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { colors } from '../assets/styles';

class NavBar extends Component {
  render() {

    const { navigation } = this.props;

    return (
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor={colors.primary}
        leftComponent={
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon
              name="ios-person"
              type="ionicon"
              color='#fff'
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'The BackBeat',
          style: {
            color: '#fff'
          }
        }}
        rightComponent={
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            onPress={() => navigation.navigate('Chat')}
          >
            <Icon
              name="ios-chatbubbles"
              type="ionicon"
              color='#fff'
            />
          </TouchableOpacity>
        }
      />
    )

  }
}

export default NavBar;
