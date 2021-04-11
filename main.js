const {client} = require ("./config");
const Stage = require("./commands/stage");

const Canvas = require("canvas");
// const prefix = process.env.PREFIX;
const prefix = "!";
// const allStages = process.env.ALLSTAGES;
const {IMG} = require ("./stage/images");

client.once("ready", async () => {
  console.log("Nb de serveurs utilisant le bot : " + client.guilds.cache.size);
  client.user.setActivity("!stage", { type: "PLAYING" });
  await IMG.loadImages()
  .catch((error) => {console.error(error)});
  
});

client.on("message", async (message) => {

  Stage.parse(message);
});

// client.login(process.env.BOT_TOKEN);
client.login("ODEyNzY2OTI0MzI5MDU4MzQ0.YDFiLw.kW-pC7fS8sUDnDRvYRwBYD9qgB8");
