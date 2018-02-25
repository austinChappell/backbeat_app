import data from '../data';

const { apiURL } = data;

class GeneralAPI {
  getAll = (resource, token, cb) => {
    const url = `${apiURL}/api/${resource}`;
    return fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((results) => {
        const { rows } = results;
        cb(rows);
      })
      .catch((err) => {
        throw err;
      });
  };

  getUserPhoto = (userid, token, cb) => {
    const url = `${apiURL}/api/userphoto/id/${userid}`;
    return fetch(url, {
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
  };

  searchUsers = (searchValue, token, cb) => {
    const url = `${apiURL}/api/searchusernames/${searchValue}`;
    return fetch(url, {
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
  };

  update = (resource, token, body, cb) => {
    const url = `${apiURL}/api/${resource}/`;
    return fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PUT',
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then((results) => {
        cb(results.rows);
      })
      .catch((err) => {
        throw err;
      });
  };
}

export default GeneralAPI;
