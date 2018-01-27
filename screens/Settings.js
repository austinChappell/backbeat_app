import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import NavBar from '../components/NavBar';

const Settings = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>
        Settings Screen
      </Text>
    </View>
  )
}

export default Settings;
