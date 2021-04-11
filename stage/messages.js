const prefix = process.env.PREFIX;
const cmdName = "stage";

module.exports = class MSG {
  static usage(message) {
    message.reply(
      `usage : \`${prefix}${cmdName} @participant1 @participant2 [option : tour2]\`\n For any questions ask Steyo`
    );
  }
  static getMessageToSend(userWanted, levelsNbToBan) {
    let fr = this.checkLanguage(userWanted);
    if (levelsNbToBan[0] == 1 && levelsNbToBan.length == 1)
      return fr ? `${userWanted} **Bannis le dernier stage**` :
                  `${userWanted} **Ban the last stage**`;
    else
      return fr ? `${userWanted} **Envoie le/les numero du stage que tu veux bannir, ${levelsNbToBan[0]} restants**` : 
                  `${userWanted} **Send the stage's number/s you want to ban, ${levelsNbToBan[0]} left**`;
  }

  static sendFinalStage(message, levels, allImages, user1, user2) {
    let fr = this.checkLanguage(user1) && this.checkLanguage(user2);
    let texte = fr ? `${user1} ${user2} Que le match commence !` : 
                   `${user1} ${user2} let the match begin!`;
    message.channel
      .send(texte, {
        files: [allImages[levels[0] - 1]],
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static userOccupied(user) {
    let fr = this.checkLanguage(user);
    return fr ? `${user} est déja en train de choisir un terrain` : `${user} is already choosing a stage`;
  }
  static checkLanguage(user) { 
    let fr;
    if (!user.locale)
      fr = true;
    else
      fr = user.locale.includes("en") ? false : true;
    return fr;
  }

  static imagesLoading(message) {
    let fr = this.checkLanguage(message.author);
    message.reply( fr ? "StageSelector bientôt prêt, veuillez patienter" : "StageSelector almost ready, please wait");
  }
};
