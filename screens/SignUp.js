import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, FormInput, FormLabel, Icon } from 'react-native-elements';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { Popover, PopoverContainer } from 'react-native-simple-popover';

import { colors, styles } from '../assets/styles';
import { onSignIn } from '../auth';

import AuthAPI from '../assets/APIs/authAPI';
import data from '../assets/data';

const authAPI = new AuthAPI()

const { createUser, validateZip } = authAPI;
const { dfwCoords } = data;

import FadeInView from '../components/FadeInView';

class SignUp extends Component {

  state = {
    email: '',
    error: '',
    firstName: '',
    formComplete: false,
    helpIcon: false,
    lastName: '',
    loading: false,
    password: '',
    popoverPlacement: 'top',
    popoverVisible: true,
    zipCode: '',
    zipCity: '',
  }

  enterSite = (results) => {
    const user = results.rows[0]
    AsyncStorage.setItem('id', String(user.id)).then(() => {      
      this.props.setUser(user)
      onSignIn(user.token).then(() => this.props.navigation.navigate('SignedIn'))
    })
  }

  handleInputChange = (val, key) => {
    const o = {};
    o[key] = val;
    this.setState(o, () => this.validateForm());
  }

  receiveCoordinates = (results) => {
    console.log('RECEIVING COORDINATES', results)
    const data = JSON.parse(results)
    console.log('RECEIVING DATA', data)
    if (data.places) {
      const { latitude, longitude } = data.places[0];
      const zipCity = data.places[0]['place name'];
      const { maxLat, minLat, maxLong, minLong } = dfwCoords;
      const latApproved = latitude <= maxLat && latitude >= minLat;
      const longApproved = longitude <= maxLong && longitude >= minLong;
      if (latApproved && longApproved) {
        this.signUp()
      } else {
        this.setState({ zipCity })
        this.setError('This zip code is not supported', true)
      }
    } else {
      this.setError('Please enter a valid zipcode', false)
    }
  }

  setError = (error, helpIcon) => {
    this.setState({ error, helpIcon })
  }

  signUp = () => {
    const { email, firstName, lastName, password, zipCode } = this.state;
    const user = { email, firstName, lastName, password, zipCode }
    createUser(user, this.enterSite, this.setError)
  }

  validateForm = () => {
    const { formComplete, email, firstName, lastName, password, zipCode } = this.state;
    const formValArr = [email.trim(), firstName.trim(), lastName.trim(), password.trim(), zipCode.trim()];
    const emptyVals = formValArr.filter(val => val.length === 0)
    if (emptyVals.length > 0 && formComplete) {
      this.setState({ formComplete: false })
    } else if (emptyVals.length === 0 && !formComplete) {
      this.setState({ formComplete: true })
    }
  }

  verifyZipcode = () => {
    console.log('VERIFYING ZIP CODE')
    validateZip(this.state.zipCode, this.receiveCoordinates)
  }

  render() {

    const { navigation } = this.props;
    const helpIcon = this.state.helpIcon ?
    <View>
      <Popover
        placement={this.state.popoverPlacement}
        arrowColor="#114B5F"
        arrowWidth={16}
        arrowHeight={8}
        isVisible={this.state.popoverVisible}
        component={() => (
          <View style={styles.popoverContainer}>
            <Text style={styles.popoverText}>
              The BackBeat is not currently servicing your area. If you are interested in having us in {this.state.zipCity}, please contact us at support@thebackbeatproject.com.
            </Text>
          </View>
        )}
      >
        <TouchableOpacity onPress={() => this.setState({ popoverVisible: !this.state.popoverVisible })}>
          <Icon
            name='md-help-circle'
            type='ionicon'
            color='#ff0000'
          />
        </TouchableOpacity>
      </Popover>
    </View>
    : null;  

    return (
      <PopoverContainer>
        <View style={ styles.container }>

          <FadeInView>

            <Card>

              <FormLabel>First Name</FormLabel>
              <FormInput
                onChangeText={(val) => this.handleInputChange(val, 'firstName')}
                value={this.state.firstName}
              />
              <FormLabel>Last Name</FormLabel>
              <FormInput
                onChangeText={(val) => this.handleInputChange(val, 'lastName')}
                value={this.state.lastName}
              />
              <FormLabel>Email</FormLabel>
              <FormInput
                onChangeText={(val) => this.handleInputChange(val, 'email')}
                value={this.state.email}
              />
              <FormLabel>Password</FormLabel>
              <FormInput
                onChangeText={(val) => this.handleInputChange(val, 'password')}
                secureTextEntry={true}
                value={this.state.password}
              />
              <FormLabel>Zip Code</FormLabel>
              <FormInput
                onChangeText={(val) => this.handleInputChange(val, 'zipCode')}
                value={this.state.zipCode}
              />
              <Button
                backgroundColor={colors.primary}
                disabled={this.state.loading || !this.state.formComplete}
                disabledStyle={{ backgroundColor: colors.primaryDisabled }}
                loading={this.state.loading}
                color={colors.white}
                buttonStyle={ styles.button }
                title="Sign Up"
                onPress={this.verifyZipcode}
              />
              <Text style={{ color: 'red', fontSize: 20, alignSelf: 'center' }}>
                {this.state.error}
              </Text>

              {helpIcon}

            </Card>

            <Text style={{ marginTop: 20, textAlign: 'center' }}>
              Already have an account?
            </Text>

            <Button
              backgroundColor={'transparent'}
              color={colors.primary}
              title="Sign In"
              onPress={() => navigation.goBack()}  
            />

          </FadeInView>
        </View>
      </PopoverContainer>
    )

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      const action = { type: 'SET_USER', user }
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(SignUp);
