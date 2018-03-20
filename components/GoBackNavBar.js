import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';

import { onSignOut } from '../auth';
import { colors } from '../assets/styles';

const propTypes = {
  logoutButton: PropTypes.bool,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const defaultProps = {
  logoutButton: false,
};

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

GoBackNavBar.propTypes = propTypes;
GoBackNavBar.defaultProps = defaultProps;

export default GoBackNavBar;
