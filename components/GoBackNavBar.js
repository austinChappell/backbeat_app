import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

import { onSignOut } from '../auth';
import { colors } from '../assets/styles';

class GoBackNavBar extends Component {

  render() {

    const { navigation } = this.props;
    const logoutButton = this.props.logoutButton ?
    <Icon
      name="ios-power"
      type="ionicon"
      color={colors.primary}
      onPress={() => onSignOut().then(() => navigation.navigate('SignedOut'))}
    /> : null;

    return (
      <Header
        backgroundColor={colors.bgLight}
        statusBarProps={{ barStyle: 'dark-content' }}
        leftComponent={logoutButton}
        rightComponent={<Icon
          name="ios-arrow-down-outline"
          type="ionicon"
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />}
      />
    )

  }
}

export default GoBackNavBar;
