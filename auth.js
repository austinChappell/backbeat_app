import { AsyncStorage } from 'react-native';

export const AUTH_TOKEN = 'auth_token';

export const onSignIn = (token) => AsyncStorage.setItem(AUTH_TOKEN, token);

export const onSignOut = () => AsyncStorage.removeItem(AUTH_TOKEN);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(AUTH_TOKEN)
      .then(res => {
        if (res !== null) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(err => reject(err))
  })
}
