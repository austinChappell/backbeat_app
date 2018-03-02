import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Picker, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Item, Input, Label } from 'native-base';

import Grid from '../components/common/Grid';
import Step1 from './BandForm/Step1';
import Step2 from './BandForm/Step2';
import Step3 from './BandForm/Step3';
import Step4 from './BandForm/Step4';
import NavBar from '../components/NavBar';

import { colors, styles } from '../assets/styles';
import BandAPI from '../assets/APIs/bandAPI';

const bandAPI = new BandAPI();

const { addMember, createBand, getMyBands } = bandAPI;

class Bands extends Component {
  state = {
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

  handleAddMemberRes = (results) => {
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
    console.log('MY BANDS', bands);
    this.setState({ bands });
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
    console.log('BAND STATE', this.state);
    const { navigation } = this.props;
    const { materialColors } = colors;
    let colorIndex = 0;
    return (
      <View>
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
        <View>
          <Button title="Create Your Own" onPress={this.toggleModal} />
        </View>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.state.bands.map((band, index) => {
              const bgColor = materialColors[colorIndex];
              colorIndex += 1;
              if (colorIndex >= materialColors.length) {
                colorIndex = 0;
              }
              return (
                <Grid
                  key={index}
                  bgColor={bgColor}
                  item={band}
                  select={this.selectBand}
                  title={band.name}
                  id={band.id}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genresReducer.genres,
  token: state.userReducer.token,
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(Bands);
