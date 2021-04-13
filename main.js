require("dotenv").config();
const { client } = require("./config");
const Stage = require("./commands/stage");
const { IMG } = require("./stage/images");
const MSG = require("./stage/messages");
const token = process.env.TOKEN;

client.once("ready", async () => {
  console.log("Nb de serveurs utilisant le bot : " + client.guilds.cache.size);
  client.guilds.cache.forEach((guild) => {
    console.log(guild);
  });
  console.log("Servers utilisant le bot : \n" + client.guilds.cache.size);
  client.user.setActivity("!banstage", { type: "PLAYING" });
  await IMG.loadImages().catch((error) => {
    console.error(error);
  });
});

client.on("message", async (message) => {
  const img = IMG.getImages();
  img
    ? Stage.parse(message)
    : !message.author.bot && MSG.imagesLoading(message);
});

// client.login(process.env.BOT_TOKEN);
client.login(token).catch((error) => {
  console.error(error);
});
