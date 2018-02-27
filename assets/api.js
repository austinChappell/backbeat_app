import { AsyncStorage } from 'react-native';
import data from './data';

const api = data.apiURL;

class Api {
  createUser = (user, cb) => {
    console.log('CREATING USER', user, api, cb);

    return fetch(`${api}/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log('RESPONSE OF CREATE USER FUNC', response);
        return response.json();
      })
      .then((results) => {
        console.log('RESULTS FROM CREATE USER FUNC', results);
        cb(results);
      })
      .catch(err => console.error('PROBLEM LOGGING OUT', err));
  };

  getProfile = (username, token, cb) =>
    fetch(`${api}/api/profile/${username}/`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    })
      .then(response => response.json())
      .then((results) => {
        console.log('RESULTS', results);
        cb(results);
      });

  getUserInfo = (userid, token, cb, cbError) =>
    fetch(`${api}/api/user/id/${userid}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((results) => {
        console.log('USER INFO', results);
        const user = results[0];
        const {
          first_name, id, is_active, last_name, onboarding_stage,
        } = user;
        // cb(user)
        AsyncStorage.setItem('firstName', first_name)
          .then(() => {
            AsyncStorage.setItem('id', String(id));
          })
          .then(() => {
            AsyncStorage.setItem('lastName', last_name);
          })
          .then(() => {
            AsyncStorage.setItem('onboardingStage', String(onboarding_stage));
          })
          .then(() => {
            cb(user);
          });
      })
      .catch(err => cbError());

  login = (credentials, cb) => {
    console.log('HITTING THE LOGIN ROUTE', credentials, cb);
    return fetch(`${api}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        console.log('RESPONSE FROM LOGIN FUNC', response);
        return response.json();
      })
      .then((results) => {
        console.log('LOGIN RESULTS', results);
        cb(results);
      })
      .catch((err) => {
        console.error('LOGIN ERROR', err);
      });
  };

  logout = (cb) => {
    console.log('hitting the logout route');
    return fetch(`${api}/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then((results) => {
        cb(results);
      })
      .catch(err => console.error('PROBLEM LOGGING OUT', err));
  };
}

export default Api;
