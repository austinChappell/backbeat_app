import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Picker, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Item, Input, Label } from 'native-base';

import { colors, styles } from '../assets/styles';

import Step1 from './BandForm/Step1';
import Step2 from './BandForm/Step2';
import Step3 from './BandForm/Step3';
import Step4 from './BandForm/Step4';
import NavBar from '../components/NavBar';

class Bands extends Component {
  state = {
    createFormVisible: false,
    description: '',
    genre: null,
    name: '',
    skill: null,
    step: 1,
  };

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
  };

  toggleModal = () => {
    const { createFormVisible } = this.state;
    this.setState({ createFormVisible: !createFormVisible });
  };

  render() {
    console.log('BAND STATE', this.state);
    const { navigation } = this.props;
    return (
      <View>
        <NavBar navigation={navigation} />
        <Modal animationType="fade" visible={this.state.createFormVisible}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              backgroundColor: colors.secondary,
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
