import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

class BandEditMember extends Component {
  state = {};

  render() {
    console.log('PROPS', this.props)
    return (
      <View>
        <Text>Band Edit Member Component</Text>
      </View>
    )
  }
}

export default BandEditMember;