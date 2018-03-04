import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import Grid from '../../components/common/Grid';

import { colors, styles } from '../../assets/styles';
import Helpers from '../../assets/helpers';

const helpers = new Helpers();

const { duplicateArrayOfObjects } = helpers;

const propTypes = {
  instruments: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
};

class Step4 extends Component {
  state = {
    instruments: [],
  };

  componentDidMount() {
    this.setInstruments();
  }

  componentDidReceiveProps(newProps) {
    if (newProps.instruments !== this.props.instruments) {
      this.setInstruments();
    }
  }

  setInstruments = () => {
    const instruments = duplicateArrayOfObjects(this.props.instruments);
    instruments.forEach((inst) => {
      inst.active = false;
    });
    this.setState({ instruments });
  };

  toggleActive = (instrument) => {
    instrument.active = !instrument.active;
    const instruments = duplicateArrayOfObjects(this.state.instruments);
    this.setState({ instruments }, () => {
      this.updateInstrumentIds();
    });
  };

  updateInstrumentIds = () => {
    const { instruments } = this.state;
    const ids = instruments.filter(item => item.active).map(inst => inst.id);
    this.props.setInstruments(ids);
  };

  render() {
    return (
      <View style={{ backgroundColor: colors.bgLight }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: colors.bgLight,
          }}
        >
          {this.state.instruments.map((instrument, index) => {
            const { label } = instrument;
            return (
              <Grid
                key={index}
                active={instrument.active}
                bgColor={instrument.active ? colors.primary : colors.white}
                color={instrument.active ? colors.white : colors.primaryLight}
                item={instrument}
                margin={2}
                select={this.toggleActive}
                title={instrument.label}
                id={instrument.id}
              />
            );
          })}
        </View>
        <Button
          backgroundColor={colors.secondary}
          disabled={this.props.saving}
          loading={this.props.saving}
          onPress={this.props.submit}
          title="Create Band"
          style={styles.button}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  instruments: state.instrumentsReducer.instruments,
  user: state.userReducer.user,
});

Step4.propTypes = propTypes;

export default connect(mapStateToProps)(Step4);
