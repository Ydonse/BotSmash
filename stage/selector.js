const User = require("./user");
const CV = require("./canvas");
const Discord = require("discord.js");
const MSG = require("./messages");
const Canvas = require("canvas");
const { allStages, allImages, IMG } = require("./images");

module.exports = class Selector {
  static async chooseStage(users, round, message) {
    //allows users to ban stages until the good one is chosen
    let levels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let levelsRemaining = 10;
    let userWanted;
    let reponses;
    let allLevelsNb = levels.length;
    let levelsNbToBan = round === 1 ? [3, 4, 2] : [3, 6];
    // console.log(
    //   `x = ${CV.getEspacementX() * 4}, y = ${
    //     CV.getEspacementY() * CV.getRowNb(levels)
    //   }`
    // );
    let canvasOriginX = IMG.getImages()[0].width * 4 + CV.getEspacementX() * 5;
    let canvasOriginY = 849 + CV.getEspacementY() * (CV.getRowNb(levels) + 2);
    let canvas = Canvas.createCanvas(canvasOriginX, canvasOriginY);

    while (levelsRemaining > 1) {
      console.log("canvas height = " + canvas.height);
      let attachment;
      userWanted = User.getUserWanted(users, round, levelsRemaining);
      canvas = CV.updateCanvas();
      await CV.drawImages(
        IMG.getImages(),
        canvas,
        levelsRemaining,
        levels,
        allLevelsNb
      );
      attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "Remaining_Stages.jpg"
      );
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
              message.channel.send(`${users[0]} ${users[1]} timeout`);
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
      MSG.sendFinalStage(message, levels, allImages, users);
    }
  }

  static checkAnswers(response, levels, userWanted) {
    //check if answers are numbers
    if (response.author != userWanted) return false;
    let reponses = Array.from(new Set(response.content.trim().split(/ +/)));
    return reponses.every((t) => levels.includes(t));
  }

  static filterStageNumbers(collected, levelsNbToBan) {
    //remove excess answers
    let reponses = Array.from(
      new Set(collected.first().content.trim().split(/ +/))
    );
    if (reponses.length > levelsNbToBan[0])
      reponses.splice(levelsNbToBan[0], reponses.length - levelsNbToBan[0]);
    return reponses;
  }
};
