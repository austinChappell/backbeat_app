import { AsyncStorage } from 'react-native';
import data from './data';
const api = data.apiURL;

class Api {

  getProfile = (username, token, cb) => {
    return fetch(`${api}/api/profile/${username}/`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token
      }
    }).then((response) => {
      return response.json()
    }).then((results) => {
      console.log('RESULTS', results)
      cb(results)
    })
  }

  getUserInfo = (userid, cb) => {
    return fetch(`${api}/api/user/id/${userid}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token: AsyncStorage.getItem('AUTH_TOKEN')
      }
    }).then((response) => {
      return response.json();
    }).then((results) => {
      console.log('USER INFO', results);
      const user = results[0]
      const {
        activation_key,
        first_name,
        id,
        is_active,
        last_name,
        onboarding_stage,
       } = user;
      // cb(user)
      AsyncStorage.setItem('firstName', first_name)
      .then(() => {
        AsyncStorage.setItem('id', String(id))
      })
      .then(() => {
        AsyncStorage.setItem('lastName', last_name)
      })
      .then(() => {
        AsyncStorage.setItem('onboardingStage', String(onboarding_stage))
      })
      .then(() => {
        cb(user)
      })
    })
  }

  login = (credentials, cb) => {
    return fetch(`${api}/login`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(credentials)
    }).then((response) => {
      return response.json()
    }).then((results) => {
      console.log('LOGIN RESULTS', results)
      cb(results)
    }).catch((err) => {
      console.error('ERROR', err)
    })
  }

  logout = (cb) => {
    return fetch(`${api}/logout`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then((response) => {
      cb(response)
    }).catch(err => console.error('PROBLEM LOGGING OUT', err))
  }

}

export default Api;
