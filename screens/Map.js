import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import NavBar from '../components/NavBar';

const Map = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>
        Map Screen
      </Text>
    </View>
  )
}

export default Map;
