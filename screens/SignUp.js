import React from 'react';
import { Button, Card } from 'react-native-elements';
import { View } from 'react-native';

const SignUp = ({ navigation }) => {
  return (
    <View style={{ paddingVertical: 20 }}>
      <Card>
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="transparent"
          textStyle={{ color: '#bcbec1' }}
          title="Sign In"
          onPress={() => navigation.navigate('SignIn')}
        />
      </Card>
    </View>
  )
}

export default SignUp;
