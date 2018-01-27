import React from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';

import GoBackNavBar from '../components/GoBackNavBar';

const Chat = ({ navigation }) => {
  return (
    <View>
      <GoBackNavBar navigation={navigation} logoutButton={false} />
      <Text>
        Chat Screen
      </Text>
    </View>
  )
}

export default Chat;
