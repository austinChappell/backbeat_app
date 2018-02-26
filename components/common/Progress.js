import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../assets/styles';

function Progress(props) {
  const { navigation } = props;

  const barHeight = 10;
  const { progress } = props;

  return (
    <View
      style={{
        height: 60,
        backgroundColor: colors.bgLight,
        justifyContent: 'center',
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Text style={{ color: colors.secondaryDark }}>Profile setup ({progress}% complete)</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={{ color: colors.secondaryDark, fontWeight: '800' }}>COMPLETE</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: barHeight,
          backgroundColor: 'white',
          borderRadius: barHeight / 2,
        }}
      >
        <View
          style={{
            height: barHeight,
            width: `${progress}%`,
            backgroundColor: colors.secondaryDark,
            borderRadius: barHeight / 2,
          }}
        />
      </View>
    </View>
  );
}

export default Progress;
