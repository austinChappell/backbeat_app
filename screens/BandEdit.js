import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Picker, ScrollView, Text, View } from 'react-native';
import { Card, FormInput, Icon } from 'react-native-elements';
import { Form, Input, Label } from 'native-base';

import FormPicker from '../components/common/FormPicker';

import BandAPI from '../assets/APIs/bandAPI';

const bandAPI = new BandAPI();

const { updateBand } = bandAPI;

class BandEdit extends Component {
  state = {
    description: '',
    genreId: null,
    name: '',
    skillId: null,
  }

  componentWillMount() {
    // load the band into state for editing
    // and saving to DB.
    this.loadBand()
  }

  handleInputChange = (val, key) => {
    clearTimeout(this.stopSubmission);
    const o = {};
    o[key] = val;
    this.setState(o, () => {
      this.submit();
    });
  }

  handlePickerChange = (val, key) => {
    clearTimeout(this.stopSubmission);
    const o = {};
    o[key]= val;
    this.setState(o, () => {
      this.submit();
    });
  }

  loadBand = () => {
    const {
      description,
      genre,
      name,
      skill_level: skill,
    } = this.props.band;
    this.setState({
      description,
      genreId: genre.id,
      name,
      skillId: skill.id,
    });
  }

  receiveUpdate = (results) => {
    this.props.updateParent()
  }

  submit = () => {
    const { band, token } = this.props;
    const { id } = band;
    const body = {
      name: this.state.name,
      genre: this.state.genreId,
      level: this.state.skillId,
      description: this.state.description,
    };

    this.stopSubmission = setTimeout(() => {
      console.log('id', id)
      console.log('body', body)
      updateBand(id, token, body, this.receiveUpdate)
    }, 1000);

  }

  render() {
    const {
      description,
      genreId,
      name,
      skillId,
    } = this.state;

    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', paddingLeft: 25, marginTop: 15 }}>
          <Icon
            name="ios-arrow-back-outline"
            onPress={this.props.goBack}
            type="ionicon"
          />
        </View>
        <Card title={`Editing "${name}"`}>
          <Form>
            <FormInput
              onChangeText={val => this.handleInputChange(val, 'name')}
              value={name}
            />
            <FormInput
              autoGrow
              maxLength={500}
              multiline
              numberOfLines={8}
              onChangeText={val => this.handleInputChange(val, 'description')}
              value={description}
              />
            <FormPicker
              handleChange={this.handlePickerChange}
              options={this.props.genres}
              title="Genre"
              stateKey="genreId"
              value={genreId}
            />
            <FormPicker
              handleChange={this.handlePickerChange}
              options={this.props.skills}
              title="Skill Level"
              stateKey="skillId"
              value={skillId}
            />
          </Form>
        </Card>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  genres: state.genresReducer.genres,
  skills: state.skillsReducer.skills,
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(BandEdit);