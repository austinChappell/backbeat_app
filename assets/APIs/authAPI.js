import { AsyncStorage } from 'react-native';
import data from '../data';
const api = data.apiURL;

class AuthAPI {

  register = (user, cb) => {

    return fetch(`${api}/signup`, {
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

}

export default AuthAPI;
