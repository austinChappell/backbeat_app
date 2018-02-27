import data from '../data';

const { apiURL } = data;

class UserAPI {
  uploadAvatar = (body, token, cb) => {
    const url = `${apiURL}/api/users/avatar`;
    console.log('UPLOADING AVATAR', body);
    return fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then((results) => {
        console.log('RESULTS', results);
        cb(results);
      })
      .catch((err) => {
        console.error('ERROR UPLOADING', err);
      });
  };
}

export default UserAPI;
