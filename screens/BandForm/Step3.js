import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { colors } from '../../assets/styles';

import Grid from '../../components/common/Grid';

const propTypes = {
  selectSkill: PropTypes.func.isRequired,
  skill: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  skills: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Step3(props) {
  const { materialColors } = colors;
  let colorIndex = 0;
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', height: 175 }}>
      {props.skills.map((skill) => {
        const selected = props.skill === skill.id;
        const bgColor = materialColors[colorIndex];
        colorIndex += 1;
        if (colorIndex >= materialColors.length) {
          colorIndex = 0;
        }
        return (
          <Grid
            key={skill.id}
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

Step3.propTypes = propTypes;

export default connect(mapStateToProps)(Step3);
