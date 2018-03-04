import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Label } from 'native-base';
import { Button } from 'react-native-elements';

import { colors, styles } from '../../assets/styles';

const propTypes = {
  description: PropTypes.string.isRequired,
  genre: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  saving: PropTypes.bool.isRequired,
  skill: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

function Step5(props) {
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

Step5.propTypes = propTypes;

export default connect(mapStateToProps)(Step5);
