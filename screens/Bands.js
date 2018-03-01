import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Picker, ScrollView, TextInput, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Item, Input, Label } from 'native-base';

import { colors, styles } from '../assets/styles';

import Step1 from './BandForm/Step1';
import Step2 from './BandForm/Step2';
import Grid from '../components/common/Grid';
import NavBar from '../components/NavBar';

class Bands extends Component {
  state = {
    createFormVisible: false,
    description: '',
    genre: null,
    name: '',
    style: null,
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
            selectStyle={this.selectStyle}
          />
        );
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

  selectStyle = (style) => {
    this.setState({ style }, () => {
      this.advanceStep();
    });
  };

  toggleModal = () => {
    const { createFormVisible } = this.state;
    this.setState({ createFormVisible: !createFormVisible });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <NavBar navigation={navigation} />
        <Modal visible={this.state.createFormVisible}>
          <ScrollView style={{ flex: 1 }}>
            {this.findStep()}
            {/* <View>
            </View>
            <View>
              <Label>Genre</Label>
              <Picker
                selectedValue={this.state.genre}
                style={{
                  marginTop: 0,
                }}
                onValueChange={val => this.handlePickerChange(val, 'genre')}
              >
                <Picker.Item label="---" value={null} />
                {this.props.genres.map((genre, index) => {
                  const selectionIndex = this.state.genre === genre.id;
                  return <Picker.Item key={index} label={genre.label} value={genre.id} />;
                })}
              </Picker>
            </View> */}
          </ScrollView>
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
