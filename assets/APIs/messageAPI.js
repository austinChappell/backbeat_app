import { AsyncStorage } from 'react-native';
import data from '../data';
const api = data.apiURL;

class MessageAPI {

  getAllMessages = (token, cb) => {
    console.log('FETCHING ALL MESSAGES');
    console.log('TOKEN', token)

    return fetch(`${api}/messages/all`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token
      }
    }).then((response) => {
      console.log('RESPONSE', response)
      return response.json();
    }).then((results) => {
      console.log('FETCHED MESSAGES', results);
      cb(results.rows);
    }).catch((err) => {
      console.error('ERROR FETCHING MESSAGES', err)
    })
  }

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

  markAsRead = (token, messageId, cb) => {
    console.log('MARK AS READ RUNNING', token, messageId, cb)
    return fetch(`${api}/message/${messageId}/markasread`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      method: 'PUT',
    }).then((response) => {
      console.log('MARK AS READ RESPONSE', response)
      return response.json()
    }).then((results) => {
      console.log('MARK AS READ RESULTS', results)
      cb(results.rows[0])
    }).catch((err) => {
      console.error('MARK AS READ ERROR', err)
    })
  }

  sendMessage = (token, recipientId, message, sender, recipient, cb) => {
    const body = {
      date: new Date(),
      message,
      recipientId,
      sender,
      recipient
    }

    console.log('BODY', body)
    return fetch(`${api}/message/send`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      method: 'POST',
      body: JSON.stringify(body)
    }).then((response) => {
      return response.json()
    }).then((results) => {
      cb(results.rows)
    }).catch((err) => {
      console.error('ERROR SENDING MESSAGE', err)
    })
  }

}

export default MessageAPI;
