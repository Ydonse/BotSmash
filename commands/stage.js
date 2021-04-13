require("dotenv").config();
const Command = require("./commands");
const User = require("../stage/user");
const Selector = require("../stage/selector");
const Msg = require("../stage/messages");
const prefix = process.env.PREFIX;
const cmdName = "banstage";
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
    let users = [User.fromMention(args[0]), User.fromMention(args[1])];
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
      args.length > 2 &&
      ["2", "3", "tour2", "tour3"].includes(args[2].toLowerCase())
    )
      return 2;
    return 1;
  }
};
