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

}

export default Api;
