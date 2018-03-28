import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

class BandEdit extends Component {
  state = {}

  render() {
    return (
      <View>
        <Icon
          name="ios-arrow-back-outline"
          onPress={this.props.goBack}
          type="ionicon"
        />
        <Text>The Band Edit Component</Text>
      </View>
    )
  }
}

export default BandEdit;