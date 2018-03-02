import data from '../data';

const { apiURL } = data;
const api = `${apiURL}/api/bands`;

class BandAPI {
  addMember = (token, bandId, memberId, cb) => {
    const url = `${api}/${bandId}/member`;
    return fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({ memberId }),
    })
      .then(response => response.json())
      .then((results) => {
        cb(results);
      })
      .catch((err) => {
        throw err;
      });
  };

  createBand = (token, body, cb) => {
    const url = `${api}/`;
    fetch(url, {
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
        const bands = results.rows;
        cb(bands);
      })
      .catch((err) => {
        throw err;
      });
  };

  getMyBands = (token, cb) => {
    const url = `${api}/`;
    fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((results) => {
        const bands = results.rows;
        cb(bands);
      })
      .catch((err) => {
        throw err;
      });
  };
}

export default BandAPI;
