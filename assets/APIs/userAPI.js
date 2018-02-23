import data from '../data';

const { apiURL } = data;

class UserAPI {
  getAllUsers = (token, cb) =>
    fetch(`${apiURL}/api/users`, {
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
        console.error('ERROR FETCHING USERS', err);
      });

  updateUserInfo = (token, body, cb) => {
    fetch(`${apiURL}/api/users/update`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then((response) => {
      console.log(response);
      cb(response);
    });
  };
}

export default UserAPI;
