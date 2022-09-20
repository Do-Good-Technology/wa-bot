const moment = require("moment");

const readyController = (client) => {
  const timeNow = moment().format("MMMM Do YYYY, HH:mm:ss");
  console.log("Client is ready!", timeNow);

  const number = "+6287738210702";
  const text = `Hi Sir, I am back !!!! on ${timeNow}`;
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number.substring(1) + "@c.us";
  client.sendMessage(chatId, text);

  const minutesNow = moment().format("h:mm a");
  if (minutesNow === "2:21 pm") {
    console.log("masuk if");
    client.sendMessage(chatId, text);
  }
};

module.exports = readyController;
