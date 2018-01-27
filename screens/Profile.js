import React from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';

import GoBackNavBar from '../components/GoBackNavBar';

const Profile = ({ navigation }) => {
  return (
    <View>
      <GoBackNavBar navigation={navigation} logoutButton={true} />
      <Text>
        Profile Screen
      </Text>
    </View>
  )
}

export default Profile;
