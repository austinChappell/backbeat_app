import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AsyncStorage, Picker, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-elements';
import { Form, Label } from 'native-base';

import BasicInfo from './ProfileSections/BasicInfo';
import UserAPI from '../../assets/APIs/userAPI';

const userAPI = new UserAPI();

const { updateUserInfo } = userAPI;

const genreOptions = [
  { label: '---', value: '' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Rock', value: 'rock' },
  { label: 'Country', value: 'country' },
  { label: 'Blues', value: 'blues' },
];

const instrumentOptions = [
  { label: '---', value: '' },
  { label: 'Drum Set', value: 'drum_set' },
  { label: 'Bass', value: 'bass' },
  { label: 'Elec. Gtr.', value: 'elec_gtr' },
  { label: 'Piano', value: 'piano' },
];

const propTypes = {
  user: PropTypes.object.isRequired,
};

class Profile extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    genres: ['', '', ''],
    instruments: ['', '', ''],
    notificationEmail: '',
    zipCode: '',
  };

  componentDidMount() {
    this.loadUser();
  }

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

  loadUser = () => {
    const { user } = this.props;
    const {
      email,
      first_name: firstName,
      last_name: lastName,
      notification_email: notificationEmail,
      zip_code: zipCode,
    } = user;
    this.setState({
      email,
      firstName,
      lastName,
      notificationEmail,
      zipCode,
    });
  };

  selectGenre = (val, index, genreIndex) => {
    const { genres } = this.state;
    genres[genreIndex] = val;
    this.setState({ genres });
  };

  updateResponse = (res) => {
    console.log('UPDATED USER', res);
  };

  updateUser = () => {
    const {
      firstName, lastName, notificationEmail, zipCode,
    } = this.state;
    const body = {
      firstName,
      lastName,
      notificationEmail,
      zipCode,
    };
    AsyncStorage.getItem('auth_token').then((token) => {
      updateUserInfo(token, body, this.updateResponse);
    });
  };

  render() {
    const {
      firstName, lastName, notificationEmail, email, zipCode,
    } = this.state;

    return (
      <View contentContainerStyle={{ flex: 0 }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Avatar
            large
            rounded
            source={{
              uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
            }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <Button title="Save" onPress={this.updateUser} />
        </View>

        <BasicInfo
          firstName={firstName}
          handleInputChange={this.handleInputChange}
          lastName={lastName}
          notificationEmail={notificationEmail}
          email={email}
          zipCode={zipCode}
        />

        <View>
          <Card title="Genres of Interest">
            <Form>
              {this.state.genres.map((stateGenre, sgIndex) => (
                <View key={sgIndex}>
                  <Label>Genre #{sgIndex + 1}</Label>
                  <Picker
                    selectedValue={this.state.genres[sgIndex]}
                    style={{ marginTop: 0 }}
                    onValueChange={(val, index) => this.selectGenre(val, index, sgIndex)}
                  >
                    {genreOptions.map((genre, index) => {
                      const selectionIndex = this.state.genres.findIndex(option => option === genre.value);
                      if (selectionIndex < 0 || selectionIndex === sgIndex || index === 0) {
                        return <Picker.Item key={index} label={genre.label} value={genre.value} />;
                      }
                    })}
                  </Picker>
                </View>
              ))}
            </Form>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Card title="Instruments">
            <Form>
              {this.state.instruments.map((stateInstrument, instIndex) => (
                <View key={instIndex}>
                  <Label>Instrument #{instIndex + 1}</Label>
                  <Picker
                    selectedValue={stateInstrument}
                    onValueChange={(val, index) =>
                      this.handlePickerChange(val, index, 'instruments', instIndex)
                    }
                  >
                    {instrumentOptions.map((instrument, index) => {
                      const selectionIndex = this.state.instruments.findIndex(option => option === instrument.value);
                      console.log('SELECTION INDEX', instrument, selectionIndex);
                      if (selectionIndex < 0 || selectionIndex === instIndex || index === 0) {
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
              ))}
            </Form>
          </Card>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

Profile.propTypes = propTypes;

export default connect(mapStateToProps)(Profile);
