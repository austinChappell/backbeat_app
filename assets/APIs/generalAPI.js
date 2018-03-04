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

  getOne = (resource, id, token, cb) => {
    const url = `${apiURL}/api/${resource}/${id}`;
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
        cb(rows[0]);
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
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((results) => {
        cb(results[0]);
      })
      .catch((err) => {
        throw err;
      });
  };

  searchUsers = (searchValue, token, cb) => {
    const url = `${apiURL}/api/users/all/name/${searchValue}`;
    return fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((results) => {
        cb(results.rows);
      })
      .catch((err) => {
        throw err;
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
