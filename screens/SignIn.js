import React from 'react'
import { Button, Card } from 'react-native-elements';
import { View } from 'react-native';

import { onSignIn } from '../auth';

const SignIn = ({ navigation }) => {
  return (
    <View style={{ paddingVertical: 20 }}>
      <Card>
        <Button
          backgroundColor="blue"
          text="Sign In"
          onPress={() => {
            onSignIn().then(() => navigation.navigate('SignedIn'))
          }}
        />
      </Card>
    </View>
  )
}

export default SignIn;
