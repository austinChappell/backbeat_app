import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import NavBar from '../components/NavBar';

const Dashboard = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>
        Dashboard Screen
      </Text>
    </View>
  )
}

export default Dashboard;
