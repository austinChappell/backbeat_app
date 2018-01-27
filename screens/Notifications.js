import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import NavBar from '../components/NavBar';

const Notifications = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>
        Notifications Screen
      </Text>
    </View>
  )
}

export default Notifications;
