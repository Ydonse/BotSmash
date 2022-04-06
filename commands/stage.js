require("dotenv").config();
const Command = require("./commands");
const User = require("../stage/user");
const Selector = require("../stage/selector");
const Msg = require("../stage/messages");
const prefix = process.env.PREFIX;
const cmdName = process.env.CMDBAN;
let currentUsers = [];

module.exports = class Stage extends Command {
  static match(message) {
    if (!this.checkCommand(message) || message.author.bot) return false;
    return true;
  }

  static async action(message) {
    const args = message.content
      .slice(prefix.length + cmdName.length)
      .trim()
      .split(/ +/);
    if(args[0] == "all")
    {
      Selector.displayAll(message);
      return;
    }
    let opponent = User.fromMention(args[0]);
    let usersConfig = [[ message.author, opponent], [opponent, message.author]];
    let users = usersConfig[this.isRandom(args)];
    if (!this.validateCommand(message, users)) return;
    currentUsers.push(users[0], users[1]);
    await Selector.chooseStage(
      users,
      this.getRound(args),
      message
    ).catch((error) => console.log(error));
    currentUsers = currentUsers.filter(function (value) {
      return value != users[0] && value != users[1];
    });
  }

  static validateCommand(message, users) {
    if (!User.checkUsersNb(message)) {
      Msg.usage(message);
      return false;
    }
    if (!User.areUsersValid(message, users, currentUsers)) return false;
    return true;
  }

  static checkCommand(message) {
    return message.content.toLowerCase().startsWith(prefix + cmdName);
  }

  static getRound(args) {
    //returns round of the match
    if (
      args.length > 1 &&
      ["2", "3", "tour2", "tour3"].includes(args[1].toLowerCase())
    )
      return 2;
    return 1;
  }

  static isRandom(args) {
    if (
      args.length > 1 &&
      ["random"].includes(args[1].toLowerCase())
    )
      return this.getRandomInt(2);
    return 0;
  }

  static getRandomInt(max) {
    let nb = Math.floor(Math.random() * max);
    return nb;
  }
};
