import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { colors, styles } from '../../assets/styles';

import Grid from '../../components/common/Grid';

const propTypes = {
  genre: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectGenre: PropTypes.func.isRequired,
};

function Step2(props) {
  const { materialColors } = colors;
  let colorIndex = 0;
  return (
    <View style={styles.gridContainer}>
      {props.genres.map((genre) => {
        const selected = props.genre === genre.id;
        const bgColor = materialColors[colorIndex];
        colorIndex += 1;
        if (colorIndex >= materialColors.length) {
          colorIndex = 0;
        }
        return (
          <Grid
            key={genre.id}
            bgColor={bgColor}
            item={genre}
            margin={0}
            selected={selected}
            select={props.selectGenre}
            title={genre.label}
            id={genre.id}
          />
        );
      })}
      <Grid />
    </View>
  );
}

const mapStateToProps = state => ({
  genres: state.genresReducer.genres,
});

Step2.propTypes = propTypes;

export default connect(mapStateToProps)(Step2);
