const Command = require("./commands");
const User = require("../stage/user");
const Selector = require("../stage/selector");
const Msg = require("../stage/messages");
const prefix = process.env.PREFIX;
const cmdName = "stage";
let currentUsers = [];

module.exports = class Stage extends Command {
  static match(message) {
    if (!this.checkCommand(message) || message.author.bot) return false;
    return true;
  }

  static async action(message) {
    if (!User.checkUsersnb(message)) return Msg.usage(message);
    const args = message.content
      .slice(prefix.length + cmdName.length)
      .trim()
      .split(/ +/);
    let user1 = User.fromMention(args[0]);
    let user2 = User.fromMention(args[1]);
    if (
      User.isUserValid(message, user1, currentUsers) !== true ||
      User.isUserValid(message, user2, currentUsers) !== true
    )
      return false;
    else if (user1 != message.author && user2 != message.author)
      return Msg.usage(message);
    currentUsers.push(user1, user2);
    await Selector.chooseStage(
      user1,
      user2,
      this.getRound(args),
      message
    ).catch((error) => console.log(error));
    currentUsers = currentUsers.filter(function (value) {
      return value != user1 && value != user2;
    });
  }

  static checkCommand(message) {
    return message.content.startsWith(prefix + cmdName);
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
