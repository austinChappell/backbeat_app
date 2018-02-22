import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker, Text, TextInput, View } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { Form, Item, Input, Label } from 'native-base';

import { colors, styles } from '../../assets/styles';

const genreOptions = [
  { label: '---', value: '' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Rock', value: 'rock' },
  { label: 'Country', value: 'country' },
  { label: 'Blues', value: 'blues' }
];

const instrumentOptions = [
  { label: '---', value: '' },
  { label: 'Drum Set', value: 'drum_set' },
  { label: 'Bass', value: 'bass' },
  { label: 'Elec. Gtr.', value: 'elec_gtr' },
  { label: 'Piano', value: 'piano' }
];

class Profile extends Component {
  state = {
    email: 'austin@test.com',
    firstName: 'Austin',
    lastName: 'Chappell',
    genres: ['', '', ''],
    instruments: ['', '', '']
  };

  handleInputChange = (val, key) => {
    const o = {};
    o[key] = val;
    this.setState(o);
  };

  handlePickerChange = (val, index, key, stateItemIndex) => {
    const options = this.state[key];
    options[stateItemIndex] = val;
    const o = {};
    o[key] = options;
    this.setState(o);
  };

  selectGenre = (val, index, genreIndex) => {
    const { genres } = this.state;
    genres[genreIndex] = val;
    this.setState({ genres });
  };

  render() {
    console.log('PROFILE STATE', this.state);
    return (
      <View contentContainerStyle={{ flex: 0 }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Avatar
            large
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
        </View>

        <View>
          <Card title="Basic Info">
            <Form>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input
                  onChangeText={text =>
                    this.handleInputChange(text, 'firstName')
                  }
                  value={this.state.firstName}
                />
              </Item>

              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input
                  onChangeText={text =>
                    this.handleInputChange(text, 'lastName')
                  }
                  value={this.state.lastName}
                />
              </Item>

              <Item floatingLabel last>
                <Label>Notification Email</Label>
                <Input
                  onChangeText={text => this.handleInputChange(text, 'email')}
                  value={this.state.email}
                />
              </Item>

              <Item floatingLabel last>
                <Label>Login Email</Label>
                <Input
                  style={{ color: colors.disabled }}
                  disabled
                  value={this.state.email}
                />
              </Item>
            </Form>
          </Card>
        </View>

        <View>
          <Card title="Genres of Interest">
            <Form>
              {this.state.genres.map((stateGenre, sgIndex) => {
                return (
                  <View key={sgIndex}>
                    <Label>Genre #{sgIndex + 1}</Label>
                    <Picker
                      selectedValue={this.state.genres[sgIndex]}
                      onValueChange={(val, index) =>
                        this.selectGenre(val, index, sgIndex)
                      }
                    >
                      {genreOptions.map((genre, index) => {
                        const selectionIndex = this.state.genres.findIndex(
                          option => option === genre.value
                        );
                        if (
                          selectionIndex < 0 ||
                          selectionIndex === sgIndex ||
                          index === 0
                        ) {
                          return (
                            <Picker.Item
                              key={index}
                              label={genre.label}
                              value={genre.value}
                            />
                          );
                        }
                      })}
                    </Picker>
                  </View>
                );
              })}
            </Form>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card title="Instrument">
            <Form>
              {this.state.instruments.map((stateInstrument, instIndex) => {
                return (
                  <View key={instIndex}>
                    <Label>Instrument #{instIndex + 1}</Label>
                    <Picker
                      selectedValue={stateInstrument}
                      onValueChange={(val, index) =>
                        this.handlePickerChange(
                          val,
                          index,
                          'instruments',
                          instIndex
                        )
                      }
                    >
                      {instrumentOptions.map((instrument, index) => {
                        const selectionIndex = this.state.instruments.findIndex(
                          option => option === instrument.value
                        );
                        console.log(
                          'SELECTION INDEX',
                          instrument,
                          selectionIndex
                        );
                        if (
                          selectionIndex < 0 ||
                          selectionIndex === instIndex ||
                          index === 0
                        ) {
                          return (
                            <Picker.Item
                              key={index}
                              label={instrument.label}
                              value={instrument.value}
                            />
                          );
                        }
                      })}
                    </Picker>
                  </View>
                );
              })}
            </Form>
          </Card>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(Profile);
