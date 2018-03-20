import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';

const propTypes = {
  bgColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  description: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  fullWidth: PropTypes.bool,
  grow: PropTypes.bool,
  margin: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  description: '',
  fullWidth: false,
  grow: false,
};

function Grid(props) {
  const {
    bgColor, color, description, item, fullWidth, grow, margin, title,
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
        <Text style={{ color, fontSize: 18 }}>{title}</Text>
      </View>
      <View>
        <Text style={{ color }}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
