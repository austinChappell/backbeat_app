import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, styles } from '../../assets/styles';

function Grid(props) {
  const {
    bgColor, data, description, item, fullWidth, grow, title, margin,
  } = props;
  const dblMargin = margin * 2;
  const width = 100;
  const halfWidth = 50;
  const gridStyle = {
    flex: 1,
    flexBasis: fullWidth ? `${width - dblMargin}%` : `${halfWidth - dblMargin}%`,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    margin: `${margin}%`,
    backgroundColor: bgColor,
    flexGrow: grow ? 1 : 0,
  };
  return (
    <TouchableOpacity style={gridStyle} onPress={() => props.select(item)}>
      <View>
        <Text style={{ color: props.color, fontSize: 18 }}>{title}</Text>
      </View>
      <View>
        <Text style={{ color: props.color }}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Grid;
