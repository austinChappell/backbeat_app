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
import NavBar from '../components/NavBar';

import { colors } from '../assets/styles';
import BandAPI from '../assets/APIs/bandAPI';

const bandAPI = new BandAPI();

const { addMember, createBand, getMyBands } = bandAPI;

const propTypes = {
  navigation: PropTypes.object.isRequired,
  token: PropTypes.string,
  user: PropTypes.object.isRequired,
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
    name: '',
    saving: false,
    skill: null,
    step: 1,
  };

  componentDidMount() {
    const { token } = this.props;
    if (token !== null) {
      getMyBands(token, this.loadBands);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      getMyBands(newProps.token, this.loadBands);
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

  handleAddMemberRes = () => {
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

  handleRes = (results) => {
    const band = results[0];
    const { token, user } = this.props;
    addMember(token, band.id, user.id, this.handleAddMemberRes);
  };

  loadBands = (bands) => {
    this.setState({ bands });
  };

  selectBand = (band) => {
    this.setState({ band });
  };

  selectGenre = (genre) => {
    this.setState({ genre }, () => {
      this.advanceStep();
    });
  };

  selectSkill = (skill) => {
    this.setState({ skill }, () => {
      this.advanceStep();
    });
  };

  submit = () => {
    // This is where the API call happens
    this.setState({ saving: true }, () => {
      const {
        name, description, skill, genre,
      } = this.state;
      const { token, user } = this.props;
      const body = {
        name,
        description,
        skill: skill.id,
        genre: genre.id,
        city: user.hub,
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
      <Band goBack={this.clearBand} bandId={this.state.band.id} token={this.props.token} />
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
              key={index}
              bgColor={colors.white}
              color={colors.primary}
              item={band}
              margin={2}
              select={this.selectBand}
              title={band.name}
              id={band.id}
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
          <ScrollView style={{ flex: 1, minHeight: '100%' }}>{this.findStep()}</ScrollView>
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
