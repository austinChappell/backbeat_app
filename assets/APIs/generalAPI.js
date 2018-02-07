import { AsyncStorage } from 'react-native';
import data from '../data';
const api = data.apiURL;

class GeneralAPI {

  getUserPhoto (userid, token, cb) {

    return fetch(`${api}/api/userphoto/id/${userid}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token
      }
    }).then((response) => {
      return response.json()
    }).then((results) => {
      cb(results[0])
    }).catch((err) => {
      console.error('ERROR FETCHING PHOTO', err)
    })
  }

}

export default GeneralAPI;