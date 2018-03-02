import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, styles } from '../../assets/styles';

function Grid(props) {
  const {
    bgColor, data, description, item, fullWidth, grow, title,
  } = props;
  const gridStyle = {
    flex: 1,
    flexBasis: fullWidth ? '100%' : '50%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    backgroundColor: bgColor,
    flexGrow: grow ? 1 : 0,
  };
  return (
    <TouchableOpacity style={gridStyle} onPress={() => props.select(item)}>
      <View>
        <Text style={{ color: colors.white, fontSize: 18 }}>{title}</Text>
      </View>
      <View>
        <Text style={{ color: colors.white }}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Grid;
