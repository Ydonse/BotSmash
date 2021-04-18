const Canvas = require("canvas");

module.exports = class DrawCanvas {
  static async drawImages(
    images,
    canvas,
    levelsRemaining,
    levels,
    allLevelsNb
  ) {
    let sizex = this.getImageWidth(levels, canvas.width);
    let sizey = this.getImageHeight(levels, canvasY);
    let espacementX = 25;
    let espacementY = 20;
    const ctx = canvas.getContext("2d");

    if (levelsRemaining == 1) {
      ctx.drawImage(
        images[0 + levels[0] - 1],
        0,
        0,
        canvas.width,
        canvas.height
      );
      return;
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let index = 0;
    let posx = 0;
    for (let i = 0; index < allLevelsNb; i++) {
      console.log(i);
      for (let j = 0; j < 4 && index < allLevelsNb; j++) {
        // console.log(`x = ${i}, j = ${j}, index = ${index}`);
        if (levels.includes((index + 1).toString())) {
          ctx.drawImage(
            images[index],
            espacementX * (j + 1) + sizex * j,
            espacementY * (i + 1) + sizey * i,
            sizex,
            sizey
          );
        } else {
          j--;
        }
        index++;
      }
    }
  }

  // static updateCanvas(levels, sizex, sizey) {
  //   console.log(sizex, sizey);
  //   let rowNb = this.getRowNb(levels);
  //   console.log("rowNb = " + rowNb);
  //   let height = sizey;
  //   let width = sizex;
  //   return Canvas.createCanvas(width, height);
  // }
  // static updateCanvas(levels, sizex, sizey) {
  //   console.log(sizex, sizey);
  //   let rowNb = this.getRowNb(levels);
  //   console.log("rowNb = " + rowNb);
  //   let height = rowNb * sizey + (rowNb + 1) * 20;
  //   let width = 4 * sizex + 5 * 25;
  //   return Canvas.createCanvas(width, height);
  // }

  static getRowNb(levels) {
    return Math.ceil(levels.length / 4);
  }

  static getImageWidth(levels, canvasX) {
    let imagesnB = levels.length > 3 ? 4 : levels.length;
    return canvasX / imagesnB;
  }
  // static getImageWidth(levels) {
  //   let rowNb = this.getRowNb(levels);
  //   switch (rowNb) {
  //     case 1:
  //       return 1000;
  //     // return 500;
  //     case 2:
  //       return 450;
  //     case 3:
  //       return 350;
  //   }
  // }
  //   static getImageHeight(levels) {
  //     let rowNb = this.getRowNb(levels);
  //     switch (rowNb) {
  //       case 1:
  //         // return 383;
  //         return 800;
  //       case 2:
  //         return 345;
  //       case 3:
  //         return 268;
  //     }
  //   }
  // };
  static getImageHeight(levels, canvasY) {
    let rowNb = this.getRowNb(levels);
    return canvasY / rowNb;
  }
};
