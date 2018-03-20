import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import NavBar from '../components/NavBar';

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

const Notifications = ({ navigation }) => (
  <View>
    <NavBar navigation={navigation} />
    <Text>Notifications Screen</Text>
  </View>
);

Notifications.propTypes = propTypes;

export default Notifications;
