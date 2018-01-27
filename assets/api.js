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
      cb(results)
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

}

export default Api;
