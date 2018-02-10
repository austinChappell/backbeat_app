class Helpers {

  findUnreadMessages = (messages, userid) => {
    return messages.filter(msg => msg.recipient_id == userid && !msg.read);
  }

}

export default Helpers;
