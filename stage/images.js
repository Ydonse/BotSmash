const Canvas = require("canvas");

const allImages = {
  0: "./ressources/images/DF.jpg",
  1: "./ressources/images/CB.jpg",
  2: "./ressources/images/SB.jpg",
  3: "./ressources/images/Smashville.jpg",
  4: "./ressources/images/Kalos.jpg",
  5: "./ressources/images/Ville.jpg",
  6: "./ressources/images/Yoshi.jpg",
  7: "./ressources/images/SP2.jpg",
  8: "./ressources/images/Lylat.jpg",
  9: "./ressources/images/Cratere.jpg",
  10: "./ressources/images/HB.jpg",
};
let images;
let background;
const allStages = "./ressources/images/allStages.jpg";
const background_img = "./ressources/images/background.jpg";

class IMG {
  static async loadImages() {
    images = await Promise.all(
      Object.values(allImages).map((element) => Canvas.loadImage(element))
    )
      .catch((error) => {
        return error;
      })
      .then(console.log("bot ready"));
  }

  static async loadBackground() {
    background = await Canvas.loadImage(background_img);
  }

  static getImages() {
    return images;
  }
  static getBackground() {
    return background;
  }
}

module.exports = {
  allImages,
  images,
  allStages,
  IMG,
};
