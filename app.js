const qrcode = require("qrcode-terminal");
const moment = require("moment");
const greetings = require("./assets/data/greetings");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

// const { Client } = require("whatsapp-web.js");
// const client = new Client();

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
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
});

client.on("message", async (message) => {
  const mentions = await message.getMentions();

  console.log("mentions", mentions);

  for (let contact of mentions) {
    console.log(`${contact.pushname} was mentioned`);
    message.reply(`
      Halo, berikut perintah yang tersedia
      🟢 @erieri ▶️ open command list
      🟢 hello, hi, halo ▶️ salam
      🟢 selamat pagi, morning ▶️ salam pagi
      🟢 minta list ulang tahun ▶️ list ulang tahun
    `);
  }
});

client.on("message", (m) => {
  const message = m.body;
  const lowerCaseMessage = message.toLowerCase();

  if (
    lowerCaseMessage === "hello" ||
    lowerCaseMessage === "hi" ||
    lowerCaseMessage === "halo"
  ) {
    console.log("send message", lowerCaseMessage);
    m.reply("Hiiiii");
  }
});

client.on("message", (m) => {
  const message = m.body;

  const lowerCaseMessage = message.toLowerCase();
  if (
    (lowerCaseMessage.includes("selamat") &&
      lowerCaseMessage.includes("pagi")) ||
    (lowerCaseMessage.includes("good") && lowerCaseMessage.includes("morning"))
  ) {
    let randomNum = 0;

    const num = Math.random();
    if (num < 0.4) randomNum = 0;
    else if (num < 0.7) randomNum = 1;
    else randomNum = Math.floor(Math.random() * 11);

    console.log("send message ", greetings[randomNum]);
    m.reply(greetings[randomNum]);
  }
});

const textListBirthday = `
    rifal. January 20
    bebek. February 1
    alex. February 10
    winda. April 7
    ela. April 12
    amy. May 12
    nia. May 26
    hasan. May 26
    bariq. June 23
    aini. July 1
    ajeng. July 15
    ridha. August 10
    vian. October 3
    `;

client.on("message", (message) => {
  if (
    message.body.includes("minta") &&
    message.body.includes("list") &&
    message.body.includes("ulang") &&
    message.body.includes("tahun")
  ) {
    console.log("send message list birthday");
    message.reply(textListBirthday);
  }
});
