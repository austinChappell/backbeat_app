import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AsyncStorage, Picker, View } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { Form, Label } from 'native-base';
import Snackbar from 'react-native-snackbar';

import BasicInfo from './ProfileSections/BasicInfo';
import GeneralAPI from '../../assets/APIs/generalAPI';
import { colors } from '../../assets/styles';

const generalAPI = new GeneralAPI();

const { update } = generalAPI;

const propTypes = {
  genres: PropTypes.array.isRequired,
  instruments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

class Profile extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    genres: [null, null, null],
    instruments: [null, null, null],
    notificationEmail: '',
    zipCode: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  handleInputChange = (val, key) => {
    clearTimeout(this.stopUpdate);
    const o = {};
    o[key] = val;
    this.setState(o, () => {
      this.stopUpdate = setTimeout(() => {
        this.updateUser();
      }, 1000);
    });
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

  updateResponse = (results) => {
    const user = results[0];
    Snackbar.show({
      title: 'Changes Saved',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.primary,
    });
    this.props.setUser(user);
  };

  updateUser = () => {
    const {
      firstName, lastName, notificationEmail, zipCode,
    } = this.state;
    const user = {
      firstName,
      lastName,
      notificationEmail,
      zipCode,
    };
    if (this.validUser()) {
      AsyncStorage.getItem('auth_token').then((token) => {
        update('users', token, user, this.updateResponse);
      });
    }
  };

  validUser = () => {
    let valid = true;
    let message;
    const {
      firstName, lastName, notificationEmail, zipCode,
    } = this.state;
    if (firstName.trim().length < 3 || lastName.trim().length < 3) {
      valid = false;
      message = 'Use at least three letters.';
    } else if (notificationEmail.indexOf('@') < 1 || notificationEmail.indexOf('.') < 3) {
      valid = false;
      message = 'Invalid email';
    } else if (zipCode.length !== 5 || !Number.isInteger(Number(zipCode))) {
      valid = false;
      message = 'Invalid zip code';
    }
    if (!valid) {
      Snackbar.show({
        title: message,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.failure,
      });
    }
    return valid;
  }

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
                    <Picker.Item label="---" value={null} />
                    {this.props.genres.map((genre, index) => {
                      const selectionIndex = this.state.genres.findIndex(option => option === genre.id);
                      if (selectionIndex < 0 || selectionIndex === sgIndex) {
                        return <Picker.Item key={index} label={genre.label} value={genre.id} />;
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
                    <Picker.Item label="---" value={null} />
                    {this.props.instruments.map((instrument, index) => {
                      const selectionIndex = this.state.instruments.findIndex(option => option === instrument.id);
                      if (selectionIndex < 0 || selectionIndex === instIndex) {
                        return (
                          <Picker.Item key={index} label={instrument.label} value={instrument.id} />
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
  genres: state.genresReducer.genres,
  instruments: state.instrumentsReducer.instruments,
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    const action = { type: 'SET_USER', user };
    dispatch(action);
  },
});

Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
