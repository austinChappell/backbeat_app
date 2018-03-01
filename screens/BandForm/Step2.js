import React from 'react';
import { connect } from 'react-redux';
import { Picker, View } from 'react-native';
import { Label } from 'native-base';

import { colors, styles } from '../../assets/styles';

import Grid from '../../components/common/Grid';

function Step2(props) {
  const { materialColors } = colors;
  return (
    <View style={styles.gridContainer}>
      {props.genres.map((genre, index) => {
        const selected = props.genre === genre.id;
        let bgColor = materialColors[index];
        if (bgColor === undefined) {
          bgColor = 'black';
        }
        return (
          <Grid
            key={index}
            bgColor={bgColor}
            selected={selected}
            selectStyle={props.selectStyle}
            title={genre.label}
            id={genre.id}
          />
        );
      })}
      <Grid />
      {/* <Label>Genre</Label>
      <Picker
        selectedValue={props.genre}
        style={{
          marginTop: 0,
        }}
        onValueChange={val => props.handlePickerChange(val, 'genre')}
      >
        <Picker.Item label="---" value={null} />
        {props.genres.map((genre, index) => {
          const selectionIndex = props.genre === genre.id;
          return <Picker.Item key={index} label={genre.label} value={genre.id} />;
        })}
      </Picker> */}
    </View>
  );
}

const mapStateToProps = state => ({
  genres: state.genresReducer.genres,
});

export default connect(mapStateToProps)(Step2);
