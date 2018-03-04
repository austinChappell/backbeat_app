import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';

import { onSignOut } from '../auth';
import { colors } from '../assets/styles';

function GoBackNavBar(props) {
  const { navigation } = props;
  const logoutButton = props.logoutButton ? (
    <TouchableOpacity
      hitSlop={{
        top: 20,
        bottom: 20,
        left: 50,
        right: 50,
      }}
      onPress={() => onSignOut().then(() => navigation.navigate('SignedOut'))}
    >
      <Icon name="ios-power" type="ionicon" color={colors.primary} />
    </TouchableOpacity>
  ) : null;

  return (
    <Header
      backgroundColor={colors.bgLight}
      statusBarProps={{ barStyle: 'dark-content' }}
      leftComponent={logoutButton}
      rightComponent={
        <TouchableOpacity
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 50,
            right: 50,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="ios-arrow-down-outline" type="ionicon" color={colors.primary} />
        </TouchableOpacity>
      }
    />
  );
}

export default GoBackNavBar;
