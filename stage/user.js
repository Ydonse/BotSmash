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

  static getUserWanted(user1, user2, tour, levelsRemaining) {
    //return user whose answer is awaited
    if (tour == 1) {
      if (levelsRemaining > 6) return user1;
      else if (levelsRemaining > 2) return user2;
      else return user1;
    } else {
      if (levelsRemaining > 6) return user1;
      else return user2;
    }
  }

  static checkUsersnb(message) {
    //check if 2 users has been taged
    return message.mentions.users.size === 2;
  }

  static isUserValid(message, user, currentUsers) {
    //check if user exists and is not occupied
    if (!user) return MSG.usage(message);
    else if (currentUsers.includes(user)) {
      return message.reply(MSG.userOccupied(user));
    }
    return true;
  }
};
