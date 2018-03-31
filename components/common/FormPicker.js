import React from 'react';
import PropTypes from 'prop-types';

import { Picker, View } from 'react-native';
import { Label } from 'native-base';

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  stateKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

const defaultProps = {
  value: null,
};

const FormPicker = props => (
  <View>
    <Label>{props.title}</Label>
    <Picker
      onValueChange={val => props.handleChange(val, props.stateKey)}
      selectedValue={props.value}
    >
      <Picker.Item label="---" value={null} />
      {props.options.map(option => (
        <Picker.Item
          key={option.id}
          label={option.label}
          value={option.id}
        />
      ))}
    </Picker>
  </View>
);

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

export default FormPicker;
