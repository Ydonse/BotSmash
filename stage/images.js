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
};
let images;
const allStages = "./ressources/images/allStages.jpg";

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

  static getImages() {
    return images;
  }
}

module.exports = {
  allImages,
  images,
  allStages,
  IMG,
};
