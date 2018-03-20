import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { View } from 'react-native';

import GoBackNavBar from '../components/GoBackNavBar';

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const Profile = (props) => {
  const { navigation, user } = props;

  return (
    <View>
      <GoBackNavBar navigation={navigation} logoutButton />
      <Text>
        Hello, {user.first_name} {user.last_name}
      </Text>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

Profile.propTypes = propTypes;

export default connect(mapStateToProps)(Profile);
