import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import Band from './Band';
import Grid from '../components/common/Grid';
import Step1 from './BandForm/Step1';
import Step2 from './BandForm/Step2';
import Step3 from './BandForm/Step3';
import Step4 from './BandForm/Step4';
import Step5 from './BandForm/Step5';
import NavBar from '../components/NavBar';

import { colors } from '../assets/styles';
import BandAPI from '../assets/APIs/bandAPI';

const bandAPI = new BandAPI();

const { addInstrument, addMember, createBand, getMyBands } = bandAPI;

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const defaultProps = {
  token: null,
};

class Bands extends Component {
  state = {
    band: null,
    bands: [],
    createFormVisible: false,
    description: '',
    genre: null,
    instruments: [],
    name: '',
    saving: false,
    skill: null,
    step: 1,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token !== null) {
      this.getData()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.getData()
    }
  }

  advanceStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  clearBand = () => {
    this.setState({ band: null });
  };

  findStep = () => {
    switch (this.state.step) {
      case 1:
        return (
          <Step1
            advanceStep={this.advanceStep}
            description={this.state.description}
            name={this.state.name}
            handleInputChange={this.handleInputChange}
            cancel={this.toggleModal}
          />
        );
      case 2:
        return (
          <Step2
            genre={this.state.genre}
            handlePickerChange={this.handlePickerChange}
            selectGenre={this.selectGenre}
          />
        );
      case 3:
        return (
          <Step3
            skill={this.state.skill}
            handlePickerChange={this.handlePickerChange}
            selectSkill={this.selectSkill}
          />
        );
      case 4:
        return (
          <Step4
            name={this.state.name}
            description={this.state.description}
            genre={this.state.genre}
            saving={this.state.saving}
            setInstruments={this.setInstruments}
            skill={this.state.skill}
            submit={this.advanceStep}
          />
        );
      case 5:
        return (
          <Step5
            name={this.state.name}
            description={this.state.description}
            genre={this.state.genre}
            saving={this.state.saving}
            skill={this.state.skill}
            submit={this.submit}
          />
        );
      default:
        return null;
    }
  };

  findTitle = () => {
    switch (this.state.step) {
      case 1:
        return 'Name and Bio';
      case 2:
        return 'Genre';
      case 3:
        return 'Skill Level';
      default:
        return null;
    }
  };

  getData = () => {
    getMyBands(this.props.token, this.loadBands);
  }

  handleAddMemberRes = results => {
    const bandId = results.rows[0].band_id;
    const { instruments } = this.state;
    const numOfInstruments = instruments.length;
    const { token } = this.props;
    instruments.forEach((instId, index) => {
      addInstrument(token, bandId, instId, numOfInstruments, index, this.handleInstRes);
    });
  };

  handleInstRes = () => {
    this.toggleModal();
    this.setState({ saving: false });
  };

  handleInputChange = (text, key) => {
    const o = {};
    o[key] = text;
    this.setState(o);
  };

  handlePickerChange = (val, key) => {
    const o = {};
    o[key] = val;
    this.setState(o);
  };

  handleRes = results => {
    const band = results[0];
    const { token, user } = this.props;
    addMember(token, band.id, user.id, this.handleAddMemberRes);
  };

  loadBands = results => {
    const bands = results.rows;
    this.setState({ bands });
  };

  selectBand = band => {
    this.setState({ band });
  };

  selectGenre = genre => {
    this.setState({ genre }, () => {
      this.advanceStep();
    });
  };

  selectSkill = skill => {
    this.setState({ skill }, () => {
      this.advanceStep();
    });
  };

  setInstruments = instruments => {
    this.setState({ instruments });
  };

  submit = () => {
    // This is where the API call happens
    this.setState({ saving: true }, () => {
      const { name, description, skill, genre, instruments } = this.state;
      const { token, user } = this.props;
      const body = {
        name,
        description,
        skill: skill.id,
        genre: genre.id,
        city: user.hub,
        instruments,
      };
      createBand(token, body, this.handleRes);
    });
  };

  toggleModal = () => {
    const { createFormVisible } = this.state;
    this.setState({ createFormVisible: !createFormVisible });
  };

  render() {
    const { navigation } = this.props;
    const content = this.state.band ? (
      <Band
        band={this.state.band}
        bandId={this.state.band.id}
        goBack={this.clearBand}
        token={this.props.token}
        updateParent={this.getData}
      />
    ) : (
      <ScrollView style={{ padding: 5, flexGrow: 1 }}>
        <View style={{ padding: 5 }}>
          <Button
            title="Create Your Own"
            onPress={this.toggleModal}
            backgroundColor={colors.secondary}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: colors.bgLight,
          }}
        >
          {this.state.bands.map((band, index) => (
            <Grid
              bgColor={colors.white}
              color={colors.primary}
              id={band.id}
              item={band}
              key={index}
              margin={2}
              select={this.selectBand}
              title={band.name}
            />
          ))}
        </View>
      </ScrollView>
    );

    return (
      <View style={{ backgroundColor: colors.bgLight, flex: 1 }}>
        <NavBar navigation={navigation} />
        <Modal animationType="fade" visible={this.state.createFormVisible}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              backgroundColor: colors.primary,
              color: colors.white,
              padding: 20,
            }}
          >
            {this.findTitle()}
          </Text>
          <ScrollView style={{ flex: 1, backgroundColor: colors.bgLight }}>
            {this.findStep()}
          </ScrollView>
        </Modal>
        {content}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userReducer.token,
  user: state.userReducer.user,
});

Bands.propTypes = propTypes;
Bands.defaultProps = defaultProps;

export default connect(mapStateToProps)(Bands);
