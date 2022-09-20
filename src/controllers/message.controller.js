const commandList = require("../../assets/data/commandList.js");
const mbhBirthdayList = require("../../assets/data/mbhBirthdayList.js");
const greetings = require("../../assets/data/greetings.js");

const messageController = async (client, message) => {
  const mentions = await message.getMentions();
  for (let contact of mentions) {
    if (contact.number === "62859106838223") {
      message.reply(commandList);
    }
  }

  const messageBody = message.body;
  const lowerCaseMessage = messageBody.toLowerCase();

  //   * Hi
  if (
    lowerCaseMessage === "hello" ||
    lowerCaseMessage === "hi" ||
    lowerCaseMessage === "halo"
  ) {
    console.log("send message", lowerCaseMessage);
    message.reply("Hiiiii");
  }

  //  * Good Morning
  if (
    (lowerCaseMessage.includes("selamat") &&
      lowerCaseMessage.includes("pagi")) ||
    (lowerCaseMessage.includes("good") && lowerCaseMessage.includes("morning"))
  ) {
    let randomNum = 0;

    const num = Math.random();
    if (num < 0.3) randomNum = 0;
    else if (num < 0.3) randomNum = 1;
    else randomNum = Math.floor(Math.random() * 11);

    console.log("send message ", greetings[randomNum]);
    message.reply(greetings[randomNum]);
  }

  // * List Birthday
  if (
    lowerCaseMessage.includes("minta") &&
    lowerCaseMessage.includes("list") &&
    lowerCaseMessage.includes("ulang") &&
    lowerCaseMessage.includes("tahun")
  ) {
    console.log("send message list birthday");
    message.reply(mbhBirthdayList);
  }
};

module.exports = messageController;
