import React from 'react';
import { connect } from 'react-redux';
import { Picker, View } from 'react-native';
import { Label } from 'native-base';

import { colors, styles } from '../../assets/styles';

import Grid from '../../components/common/Grid';

function Step2(props) {
  const { materialColors } = colors;
  let colorIndex = 0;
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', height: 175 }}>
      {props.skills.map((skill, index) => {
        const selected = props.skill === skill.id;
        const bgColor = materialColors[colorIndex];
        colorIndex += 1;
        if (colorIndex >= materialColors.length) {
          colorIndex = 0;
        }
        return (
          <Grid
            key={index}
            fullWidth
            grow
            item={skill}
            bgColor={bgColor}
            selected={selected}
            select={props.selectSkill}
            title={skill.label}
            description={skill.description}
            id={skill.id}
          />
        );
      })}
      <Grid />
    </View>
  );
}

const mapStateToProps = state => ({
  skills: state.skillsReducer.skills,
});

export default connect(mapStateToProps)(Step2);
