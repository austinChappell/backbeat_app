import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const GoBackButton = props => (
  <View
    style={{
      flexDirection: 'row',
      paddingLeft: 25,
      marginTop: 15,
    }}
  >
    <Icon
      name="ios-arrow-back-outline"
      onPress={props.goBack}
      type="ionicon"
    />
  </View>
);

export default GoBackButton;
