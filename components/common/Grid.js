import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, styles } from '../../assets/styles';

function Grid(props) {
  const { data, description, title } = props;
  return (
    <TouchableOpacity style={styles.gridItem}>
      <View>
        <Text>{title}</Text>
      </View>
      <View>
        <Text>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Grid;
