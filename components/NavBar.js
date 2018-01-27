import React, { Component } from 'react';
import { Header, Icon } from 'react-native-elements';

class NavBar extends Component {
  render() {

    const { navigation } = this.props;

    return (
      <Header
        leftComponent={<Icon
          name="ios-person"
          type="ionicon"
          color='#fff'
          onPress={() => navigation.navigate('Profile')}
        />}
        centerComponent={{
          text: 'BackBeat',
          style: {
            color: '#fff'
          }
        }}
        rightComponent={<Icon
          name="ios-chatbubbles"
          type="ionicon"
          color='#fff'
          onPress={() => navigation.navigate('Chat')}
        />}
      />
    )

  }
}

export default NavBar;
