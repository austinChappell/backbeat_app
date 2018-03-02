import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { Button, Card } from 'react-native-elements';

import { colors, styles } from '../../assets/styles';

function Step1(props) {
  const { description, handleInputChange, name } = props;
  return (
    <Card>
      <View>
        <Label>Band Name</Label>
        <Input
          style={{ borderColor: colors.border, borderWidth: 1, borderRadius: 4 }}
          onChangeText={text => handleInputChange(text, 'name')}
          value={name}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Label>Description</Label>
        <Input
          style={{
            height: 100,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 4,
          }}
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
      <Button
        backgroundColor={colors.failure}
        onPress={props.cancel}
        title="Cancel"
        style={styles.button}
      />
    </Card>
  );
}

export default Step1;
