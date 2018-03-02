import React from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { Button } from 'react-native-elements';

import { colors, styles } from '../../assets/styles';

function Step1(props) {
  const { description, handleInputChange, name } = props;
  return (
    <View>
      <View>
        <Label>Name:</Label>
        <Text>{props.name}</Text>
      </View>
      <View>
        <Label>Bio:</Label>
        <Text>{props.description}</Text>
      </View>
      <View>
        <Label>Genre:</Label>
        <Text>{props.genre.label}</Text>
      </View>
      <View>
        <Label>Skill Level:</Label>
        <Text>{props.skill.label}</Text>
      </View>
      <View>
        <Label>Location:</Label>
        <Text>{props.user.hub}</Text>
      </View>
      <Button
        backgroundColor={colors.primary}
        disabled={props.saving}
        loading={props.saving}
        onPress={props.submit}
        title="Create Band"
        style={styles.button}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Step1);
