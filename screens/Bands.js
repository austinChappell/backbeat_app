import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import NavBar from '../components/NavBar';

const Bands = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>
        Bands Screen
      </Text>
    </View>
  )
}

export default Bands;
