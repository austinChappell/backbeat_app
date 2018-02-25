import { AsyncStorage } from 'react-native';
import data from '../data';

const api = data.apiURL;

class MessageAPI {
  getAllMessages = (token, cb) => fetch(`${api}/messages/all`, {
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
      console.error('ERROR FETCHING MESSAGES', err);
    });

  // getUserMessages = (userid, token, cb) => {
  //   return fetch(`${api}/messages/${userid}`, {
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       token
  //     }
  //   }).then((response) => {
  //     return response.json()
  //   }).then((results) => {
  //     cb(results.rows)
  //   }).catch((err) => {
  //     console.error('ERROR GETTING USER MESSAGES', err)
  //   })
  // }

  markAsRead = (token, messageId, cb) => fetch(`${api}/message/${messageId}/markasread`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    method: 'PUT',
  })
    .then(response => response.json())
    .then((results) => {
      cb(results.rows[0]);
    })
    .catch((err) => {
      console.error('MARK AS READ ERROR', err);
    });

  sendMessage = (token, recipientId, message, sender, recipient, cb) => {
    const body = {
      date: new Date(),
      message,
      recipientId,
      sender,
      recipient,
    };

    return fetch(`${api}/message/send`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then((results) => {
        cb(results.rows);
      })
      .catch((err) => {
        console.error('ERROR SENDING MESSAGE', err);
      });
  };
}

export default MessageAPI;
