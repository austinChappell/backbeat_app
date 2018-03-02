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
        <Text>Naame: {props.name}</Text>
      </View>
      <View>
        <Text>Bio: {props.description}</Text>
      </View>
      <View>
        <Text>Genre: {props.genre.label}</Text>
      </View>
      <View>
        <Text>Skill: {props.skill.label}</Text>
      </View>
      <View>
        <Text>City: {props.user.hub}</Text>
      </View>
      <Button
        backgroundColor={colors.primary}
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
