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
    <View style={styles.gridContainer}>
      {props.genres.map((genre, index) => {
        const selected = props.genre === genre.id;
        const bgColor = materialColors[colorIndex];
        colorIndex += 1;
        if (colorIndex >= materialColors.length) {
          colorIndex = 0;
        }
        return (
          <Grid
            key={index}
            bgColor={bgColor}
            item={genre}
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

export default connect(mapStateToProps)(Step2);
