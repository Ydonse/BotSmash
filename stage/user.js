const MSG = require("./messages");
const { client } = require("../config");

module.exports = class User {
  static fromMention(mention) {
    //return discord user from mention
    if (!mention) return;

    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;

    const id = matches[1];
    return client.users.cache.get(id);
  }
  static switchUser(users, userWanted) {
    if (userWanted === users[0]) return users[1];
    return users[0];
  }

  static getUserWanted(users, tour, levelsRemaining) {
    //return user whose answer is awaited
    if (tour == 1) {
      if (levelsRemaining > 6) return users[0];
      else if (levelsRemaining > 2) return users[1];
      else return users[0];
    } else {
      if (levelsRemaining > 6) return users[0];
      else return users[1];
    }
  }

  static checkUsersNb(message) {
    //check if 1 user has been taged
    return message.mentions.users.size === 1;
  }

  static areUsersValid(message, users, currentUsers) {
    //check if user exists and is not occupied
    if (!users[0] || !users[1]) {
      MSG.usage(message);
      return false;
    } else if (currentUsers.includes(users[0])) {
      message.reply(MSG.userOccupied(users[0]));
      return false;
    } else if (currentUsers.includes(users[1])) {
      message.reply(MSG.userOccupied(users[1]));
      return false;
    } else if (users[0] != message.author && users[1] != message.author) {
      message.reply(MSG.fighterOnly(message));
      return false;
    }
    return true;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
};
