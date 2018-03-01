import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, styles } from '../../assets/styles';

function Grid(props) {
  const {
    bgColor, data, description, id, title,
  } = props;
  const gridStyle = {
    flex: 1,
    flexBasis: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    height: 100,
    borderColor: colors.white,
    backgroundColor: bgColor,
  };
  return (
    <TouchableOpacity style={gridStyle} onPress={() => props.selectStyle(id)}>
      <View>
        <Text style={{ color: colors.white, fontSize: 18 }}>{title}</Text>
      </View>
      <View>
        <Text>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Grid;
