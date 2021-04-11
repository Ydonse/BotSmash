const Canvas = require("canvas");

const allImages = {
  0: "http://www.donsefactory.com/wp-content/uploads/2021/02/DF-2.jpg",
  1: "http://www.donsefactory.com/wp-content/uploads/2021/02/CB-2.jpg",
  2: "http://www.donsefactory.com/wp-content/uploads/2021/02/SB-2.jpg",
  3: "http://www.donsefactory.com/wp-content/uploads/2021/02/Smashville-2.jpg",
  4: "http://www.donsefactory.com/wp-content/uploads/2021/02/Kalos-2.jpg",
  5: "http://www.donsefactory.com/wp-content/uploads/2021/02/Ville-2.jpg",
  6: "http://www.donsefactory.com/wp-content/uploads/2021/02/Yoshi-2.jpg",
  7: "http://www.donsefactory.com/wp-content/uploads/2021/02/SP2-2.jpg",
  8: "http://www.donsefactory.com/wp-content/uploads/2021/02/Lylat-2.jpg",
};
let images;
const allStages =
  "http://www.donsefactory.com/wp-content/uploads/2021/02/allStages.jpg";

class IMG {
  static async loadImages() {
    images = await Promise.all(
      Object.values(allImages).map((element) => Canvas.loadImage(element))
    ).catch((error) => {
      return error;
    }).then(console.log("bot ready"));
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
