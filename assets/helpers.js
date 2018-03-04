class Helpers {
  duplicateArrayOfObjects = (arr) => {
    const output = [];
    arr.forEach((obj) => {
      const o = Object.assign({}, obj);
      output.push(o);
    });
    return output;
  };

  findUnreadMessages = (messages, userid) =>
    messages.filter(msg => msg.recipient_id == userid && !msg.read);
}

export default Helpers;
