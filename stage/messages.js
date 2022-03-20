require("dotenv").config();
const prefix = process.env.PREFIX;
const cmdName = process.env.CMDBAN;
const localisation = {
  fr: {
    banLast: "${userWanted} **Bannis le dernier stage**",
    ban:
      "${userWanted} **Envoie le/les numero du stage que tu veux bannir, ${remaining} restants**",
    finalStage: "**${user1} ${user2} Que le match commence !**",
    fighters: "Seuls les combattants mentionnés peuvent saisir la commande",
    loading: "StageSelector bientôt prêt, veuillez patienter",
    occupied: "${user} est déja en train de choisir un terrain",
  },
  en: {
    banLast: "${userWanted} **Ban the last stage**",
    ban:
      "${userWanted} **Send the stage's number/s you want to ban, ${remaining} left**",
    finalStage: "**${user1} ${user2} let the match begin!**",
    fighters: "Only mentionned fighters can use the command",
    loading: "StageSelector almost ready, please wait",
    occupied: "${user} is already choosing a stage",
  },
};

module.exports = class MSG {
  static usage(message) {
    message.reply(
      `usage : \`${prefix}${cmdName} @participant1 @participant2 [option : tour2]\`\n For any questions ask Steyo`
    );
  }
  static getMessageToSend(userWanted, levelsNbToBan) {
    let language = this.checkLanguage(userWanted);
    if (levelsNbToBan[0] == 1 && levelsNbToBan.length == 1)
      return localisation[language].banLast.replace(
        "${userWanted}",
        userWanted
      );
    else
      return localisation[language].ban
        .replace("${userWanted}", userWanted)
        .replace("${remaining}", levelsNbToBan[0]);
  }

  static sendFinalStage(message, levels, allImages, users) {
    let language;
    if (
      this.checkLanguage(users[0]) === "fr" &&
      this.checkLanguage(users[1]) === "fr"
    )
      language = "fr";
    else language = "en";
    const text = localisation[language].finalStage
      .replace("${user1}", users[0])
      .replace("${user2}", users[1]);
    message.channel
      .send(text, {
        files: [allImages[levels[0] - 1]],
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static userOccupied(user) {
    let language = this.checkLanguage(user);
    return localisation[language].occupied.replace("${user}", user);
  }

  static fighterOnly(message) {
    let language = this.checkLanguage(message.author);
    return localisation[language].fighters;
  }
  static checkLanguage(user) {
    let language;
    language = user.locale ?? "fr";
    language = user.locale?.includes("en") ? "en" : "fr";
    return language;
  }

  static imagesLoading(message) {
    let language = this.checkLanguage(message.author);
    message.reply(localisation[language].occupied);
  }
};
