import data from '../data';
import {
  get,
  put
} from './main';

const { apiURL } = data;
const api = `${apiURL}/api/bands`;

class BandAPI {
  addInstrument = (token, bandId, instrumentId, numOfInstruments, index, cb) => {
    const url = `${api}/${bandId}/instrument`;
    return fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({ instrumentId }),
    })
      .then(response => response.json())
      .then((results) => {
        if (index === numOfInstruments - 1) {
          cb(results);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

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
    get(url, token, cb);
  };

  updateBand = (id, token, body, cb) => {
    const url = `${api}/${id}`;
    put(url, token, body, cb);
  }
}

export default BandAPI;
