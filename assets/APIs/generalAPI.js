import { AsyncStorage } from 'react-native';
import data from '../data';
const api = data.apiURL;

class GeneralAPI {

  getUserPhoto (userid, token, cb) {

    console.log('ABOUT TO FETCH PHOTO')
    console.log('URL', api)
    console.log('USER ID', userid)
    console.log('TOKEN', token)

    return fetch(`${api}/api/userphoto/id/${userid}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token
      }
    }).then((response) => {
      return response.json()
    }).then((results) => {
      console.log('FETCH PROFILE PHOTO RESULTS', results)
      cb(results[0])
    }).catch((err) => {
      console.error('ERROR FETCHING PHOTO', err)
    })
  }

}

export default GeneralAPI;