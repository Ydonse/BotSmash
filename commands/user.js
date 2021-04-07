module.exports = class User {

  getUserFromMention(mention) {
    if (!mention) return;

    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;
  
    const id = matches[1];
    return client.users.cache.get(id);
  }


  getUserWanted(user1, user2, tour, levelsRemaining) { //return user whose answer is waited
    if (tour == 1) {
      if (levelsRemaining > 6) return user1;
      else if (levelsRemaining > 2) return user2;
      else return user1;
    } else {
      if (levelsRemaining > 6) return user1;
      else return user2;
    }
  }
}
