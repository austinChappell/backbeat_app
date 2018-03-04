import { AsyncStorage } from 'react-native';
import data from './assets/data';

const api = data.apiURL;

export const AUTH_TOKEN = 'auth_token';

export const onSignIn = token => AsyncStorage.setItem(AUTH_TOKEN, token);

export const onSignOut = () => AsyncStorage.removeItem(AUTH_TOKEN);

export const isSignedIn = () => new Promise((resolve, reject) => {
  AsyncStorage.getItem(AUTH_TOKEN)
    .then((res) => {
      if (res !== null) {
        fetch(`${api}/api/checktoken`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${res}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((err) => {
            resolve(false);
          });
      } else {
        resolve(false);
      }
    })
    .catch(err => reject(err));
});
