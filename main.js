require("dotenv").config();
const { client } = require("./config");
const Stage = require("./commands/stage");
const { IMG } = require("./stage/images");
const MSG = require("./stage/messages");
const token = process.env.TOKEN;

client.once("ready", async () => {
  console.log("Nb de serveurs utilisant le bot : " + client.guilds.cache.size);
  //parsing
  client.guilds.cache.forEach((guild) => {
    console.log("\x1b[33m%s\x1b[0m", `${guild.name}`);
  });
  client.user.setActivity("!bs", { type: "PLAYING" });
  await IMG.loadImages().catch((error) => {
    console.error(error);
  });
  await IMG.loadBackground().catch((error) => {
    console.log(error);
  });
});

client.on("message", async (message) => {
  const img = await IMG.getImages();
  Stage.parse(message);
});

// client.login(process.env.BOT_TOKEN);
client.login(token).catch((error) => {
  console.error(error);
});
