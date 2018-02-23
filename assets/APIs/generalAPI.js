import data from '../data';

const api = data.apiURL;

class GeneralAPI {
  checkToken = token => fetch(`${api}/api/checktoken`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log('CHECK TOKEN RESPONSE', response);
    })
    .catch((err) => {
      console.log('CHECK TOKEN ERROR', error);
    });

  getUserPhoto(userid, token, cb) {
    return fetch(`${api}/api/userphoto/id/${userid}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    })
      .then(response => response.json())
      .then((results) => {
        cb(results[0]);
      })
      .catch((err) => {
        console.error('ERROR FETCHING PHOTO', err);
      });
  }

  searchUsers(searchValue, token, cb) {
    console.log('SEARCH VALUE', searchValue);
    console.log('TOKEN', token);

    return fetch(`${api}/api/searchusernames/${searchValue}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    })
      .then(response => response.json())
      .then((results) => {
        cb(results.rows);
      })
      .catch((err) => {
        console.error('SEARCH ERROR', err);
      });
  }
}

export default GeneralAPI;
