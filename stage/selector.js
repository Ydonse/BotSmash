const User = require("./user");
const CV = require("./canvas");
const Discord = require("discord.js");
const MSG = require("./messages");
const Canvas = require("canvas");
const { allStages, allImages, IMG } = require("./images");

module.exports = class Selector {
  static async chooseStage(user1, user2, round, message) {
    //allows users to ban stages until the good one is chosen
    let levels = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let levelsRemaining = 9;
    let userWanted;
    let reponses;
    let levelsNbToBan = round === 1 ? [3, 5] : [3, 4, 1];
    const canvas = Canvas.createCanvas(1000, 700);

    while (levelsRemaining > 1) {
      let attachment;
      userWanted = User.getUserWanted(user1, user2, round, levelsRemaining);
      if (levelsRemaining == 9) attachment = { files: [allStages] };
      else {
        await CV.drawImages(IMG.getImages(), canvas, levelsRemaining, levels);
        attachment = new Discord.MessageAttachment(
          canvas.toBuffer(),
          "Remaining_Stages.jpg"
        );
      }
      await message.channel
        .send(MSG.getMessageToSend(userWanted, levelsNbToBan), attachment)
        .then(async () => {
          await message.channel
            .awaitMessages(
              (response) => this.checkAnswers(response, levels, userWanted),
              { max: 1, time: 60000, errors: ["time"] }
            )
            .then((collected) => {
              reponses = this.filterStageNumbers(collected, levelsNbToBan);
              levels = levels.filter((word) => !reponses.includes(word));
              levelsRemaining = levels.length;
              levelsNbToBan[0] -= reponses.length;
              if (levelsNbToBan[0] == 0) levelsNbToBan.shift();
            })
            .catch((error) => {
              message.channel.send(`${user1} ${user2} timeout`);
              console.log(error);
              levelsRemaining = 0;
            });
        })
        .catch((error) => {
          console.error(error);
          levelsRemaining = 0;
        });
    }
    if (levelsRemaining === 1) {
      MSG.sendFinalStage(message, levels, allImages, user1, user2);
    }
  }

  static checkAnswers(response, levels, userWanted) {
    //check if answers are numbers
    if (response.author != userWanted) return false;
    let reponses = response.content.trim().split(/ +/);
    return reponses.every((t) => levels.includes(t));
  }

  static filterStageNumbers(collected, levelsNbToBan) {
    //remove excess answers
    let reponses = collected.first().content.trim().split(/ +/);
    if (reponses.length > levelsNbToBan[0])
      reponses.splice(levelsNbToBan[0], reponses.length - levelsNbToBan[0]);
    return reponses;
  }
};
