const qrcode = require("qrcode-terminal");

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
  console.log("Client is ready!");
});

client.on("message", (message) => {
  if (message.body === "hello") {
    message.reply("Hiiiii");
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
    message.reply(textListBirthday);
  }
});
