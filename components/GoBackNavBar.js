import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

import { onSignOut } from '../auth';

class GoBackNavBar extends Component {

  render() {

    const { navigation } = this.props;
    const logoutButton = this.props.logoutButton ?
    <Icon
      name="ios-power"
      type="ionicon"
      color='#fff'
      onPress={() => onSignOut().then(() => navigation.navigate('SignedOut'))}
    /> : null;

    return (
      <Header
        leftComponent={logoutButton}
        rightComponent={<Icon
          name="ios-arrow-down-outline"
          type="ionicon"
          color='#fff'
          onPress={() => navigation.goBack()}
        />}
      />
    )

  }
}

export default GoBackNavBar;
