import { AsyncStorage } from 'react-native';
import data from '../data';
const api = data.apiURL;

class AuthAPI {

  checkFBToken = (user, cb) => {

    console.log('USER IN CHECK FB TOKEN', user)

    return fetch(`${api}/fblogin`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then((response) => {
      console.log('CHECK FB TOKEN RESPONSE', response)
      return response.json()
    }).then((results) => {
      console.log('CHECK FB TOKEN RESULTS', results)
      cb(results)
    }).catch((err) => {
      console.error('CHECK FB TOKEN ERROR', err)
    })
  }

  createUser = (user, cb, cbError) => {

    console.log('CREATING USER', user, api, cb);

    return fetch(`${api}/signup`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then((response) => {
      console.log('RESPONSE OF CREATE USER FUNC', response)
      return response.json()
    }).then((results) => {
      console.log('RESULTS FROM CREATE USER FUNC', results)
      cb(results)
    }).catch(err => cbError('An account with this email already exists.', false))

  }

  registerFB = (user, cb) => {

    return fetch(`${api}/signup_fb`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    }).then((response) => {
      console.log('REGISTER ROUTE RESPONSE', response)
      return response.json()
    }).then((results) => {
      console.log('REGISTER ROUTE RESULTS', results)
      cb (results)
    }).catch((err) => {
      console.error('REGISTER ROUTE ERROR', err)
    })
  }

  validateZip = (zipCode, cb) => {

    console.log('VALIDATING ZIP', zipCode, cb)

    var client = new XMLHttpRequest();
    client.open("GET", `http://api.zippopotam.us/us/${zipCode}`, true);
    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        cb(client.responseText)
      };
    };

    client.send();

  }

}

export default AuthAPI;
