const Canvas = require("canvas");
const { IMG } = require("./images");

let espacementX = 25;
let espacementY = 20;

module.exports = class DrawCanvas {
  static async drawImages(images, canvas, levelsRemaining, levels, ratio) {
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

    ctx.drawImage(IMG.getBackground(), 0, 0, canvas.width, canvas.height);
    canvas.area = this.calculateArea(canvas.width, canvas.height);
    const imageArea = canvas.area / levels.length;
    let sizex = this.getImageWidth(imageArea, ratio, canvas);

    let sizey = this.getImageHeight(canvas, sizex, ratio);
    sizex = sizey * ratio;
    let columns = Math.floor(canvas.width / sizex);
    espacementX = this.calculateEspacementX(canvas.width, sizex, columns);
    espacementY = this.calculateEspacementY(
      canvas.height,
      sizey,
      levels,
      columns
    );

    levels.forEach(function (item, index) {
      ctx.drawImage(
        images[0 + item - 1],
        DrawCanvas.getPosX(index, espacementX, sizex, canvas, columns),
        DrawCanvas.getPosY(index, sizey, columns, espacementY),
        sizex,
        sizey
      );
    });
  }

  static getPosX(index, espacementX, sizex, canvas, columns) {
    let modulo = (index + 1) % columns;
    modulo = modulo === 0 ? columns : modulo;
    let spacing = espacementX * modulo;
    let pos = spacing + sizex * (index % columns);
    return pos;
  }
  static getPosY(index, sizey, columns, espacementY) {
    let currentRow = Math.floor(index / columns);
    return espacementY * (currentRow + 1) + sizey * currentRow;
  }

  static getRatio(width, height) {
    return width / height;
  }

  static getRowNb(canvasHeight, imageHeight) {
    return canvasHeight / imageHeight;
  }

  static getImageWidth(imageArea, ratio, canvas) {
    let sizex = Math.sqrt(imageArea * ratio);
    let columns = Math.ceil(canvas.width / sizex);
    sizex = canvas.width / columns;
    return sizex;
  }
  static getImageHeight(canvas, sizex, ratio) {
    let sizeY = sizex / ratio;
    let rows = Math.ceil(this.getRowNb(canvas.height, sizeY));
    sizeY = canvas.height / rows;
    return sizeY;
  }
  static calculateEspacementX(canvasWidth, imageWidth) {
    let columns = Math.floor(canvasWidth / imageWidth);
    let fullSpace = canvasWidth % (imageWidth * columns);
    let space = fullSpace / (columns + 1);
    return space;
  }
  static calculateEspacementY(canvasHeight, imageHeight, level, columns) {
    let rows = Math.ceil(level.length / columns);
    let fullSpace = canvasHeight % (imageHeight * rows);
    let space = fullSpace / (rows + 1);
    return space;
  }

  static createFullCanvas(width, ratio) {
    let x = width * 4 + espacementX * 5;
    let y = (width * 4) / ratio;
    return Canvas.createCanvas(x, y);
  }

  static getEspacementX() {
    return espacementX;
  }

  static calculateArea(width, height) {
    return width * height;
  }
};
