const User = require("./user");
const CV = require("./canvas");
const Discord = require("discord.js");
const MSG = require("./messages");
const { allImages, IMG } = require("./images");

module.exports = class Selector {
  static async chooseStage(users, round, message) {
    //allows users to ban stages until the good one is chosen
    let levels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let levelsRemaining = levels.length;
    let userWanted = users[0];
    let reponses;
    let ratio = CV.getRatio(
      IMG.getImages()[0].width,
      IMG.getImages()[0].height
    );
    let levelsNbToBan = round === 1 ? [3, 4, 2] : [3, 6];
    let canvas = CV.createFullCanvas(IMG.getImages()[0].width, ratio);
    canvas.area = CV.calculateArea(canvas.width, canvas.height);

    while (levelsRemaining > 1) {
      let attachment;
      await CV.drawImages(
        IMG.getImages(),
        canvas,
        levelsRemaining,
        levels,
        ratio
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

              if(levelsNbToBan.length === 1)
              {
                levelsRemaining = 1;
                levels = [reponses[0]];
              }
              else
              {
                levelsRemaining = levels.length;
                levelsNbToBan[0] -= reponses.length;
                if (levelsNbToBan[0] == 0) {
                  levelsNbToBan.shift();
                  userWanted = User.switchUser(users, userWanted);
                }
              }

              
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
