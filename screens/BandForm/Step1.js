import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { Button } from 'react-native-elements';

import { colors, styles } from '../../assets/styles';

function Step1(props) {
  const { description, handleInputChange, name } = props;
  return (
    <View>
      <View>
        <Item floatingLabel>
          <Label>Band Name</Label>
          <Input onChangeText={text => handleInputChange(text, 'name')} value={name} />
        </Item>
      </View>
      <View>
        <Label>Description</Label>
        <TextInput
          style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
          maxLength={500}
          multiline
          numberOfLines={8}
          onChangeText={text => handleInputChange(text, 'description')}
          value={description}
        />
      </View>
      <Button
        backgroundColor={colors.primary}
        onPress={props.advanceStep}
        title="Next"
        style={styles.button}
      />
    </View>
  );
}

export default Step1;
