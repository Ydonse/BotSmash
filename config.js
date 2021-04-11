const Discord = require("discord.js");
const client = new Discord.Client();

class Config {

    static getClient () {
        return client;
    }

}
module.exports = {
    Discord,
    client,
    Config,
};
