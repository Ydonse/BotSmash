const Canvas = require("canvas");

let espacementX = 25;
let espacementY = 20;

module.exports = class DrawCanvas {
  static async drawImages(
    images,
    canvas,
    levelsRemaining,
    levels,
    allLevelsNb
  ) {
    let sizex = this.getImageWidth(levels, canvas.width);
    let sizey = this.getImageHeight(levels, canvas.height);
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

    levels.forEach(function (item, index) {
      console.log(`item = ${typeof item}, index = ${index}`);
      ctx.drawImage(
        images[0 + item - 1],
        DrawCanvas.getPosX(index, espacementX, sizex),
        DrawCanvas.getPosY(index, espacementY, levels, sizey),
        sizex,
        sizey
      );
    });
  }

  static setImage(element, index, ctx, sizex, sizey, images) {
    console.log(`item = ${element}, index = ${index}`);
    ctx.drawImage(images[index], this.getPosX(), this.getPosY(), sizex, sizey);
  }

  static getPosX(index, espacementX, sizex) {
    return espacementX * ((index % 4) + 1) + sizex * (index % 4);
  }
  static getPosY(index, espacementY, levels, sizey) {
    let currentRow = Math.floor(index / 4);
    return espacementY * (currentRow + 1) + sizey * currentRow;
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

  static getImageHeight(levels, canvasY) {
    let rowNb = this.getRowNb(levels);
    return canvasY / rowNb;
  }

  static getEspacementX() {
    return espacementX;
  }
  static getEspacementY() {
    return espacementY;
  }
};
