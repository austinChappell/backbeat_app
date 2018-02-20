import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { colors, styles } from '../../assets/styles';

class Progress extends Component {

  render() {

    const barHeight = 10;
    const {progress} = this.props

    return (
      <View style={{
        height: 60,
        backgroundColor: colors.bgLight,
        justifyContent: 'center',
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5
        }}>
          <Text style={{ color: colors.secondaryDark }}>Profile setup ({progress}% complete)</Text>
          <Text style={{ color: colors.secondaryDark, fontWeight: '800' }}>COMPLETE</Text>
        </View>
        <View style={{
          height: barHeight,
          backgroundColor: 'white',
          borderRadius: barHeight / 2
        }}>
          <View style={{
            height: barHeight,
            width: `${progress}%`,
            backgroundColor: colors.secondaryDark,
            borderRadius: barHeight / 2
          }}>

          </View>
        </View>
      </View>
    )
  }

}

export default Progress;