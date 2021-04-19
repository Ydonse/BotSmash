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
    let sizey = this.getImageHeight(levels, canvas.height);
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

    // let index = 0;
    // for (let i = 0; index < allLevelsNb; i++) {
    //   console.log(i);
    //   for (let j = 0; j < 4 && index < allLevelsNb; j++) {
    //     // console.log(`x = ${i}, j = ${j}, index = ${index}`);
    //     if (levels.includes((index + 1).toString())) {
    //       ctx.drawImage(
    //         images[index],
    //         espacementX * (j + 1) + sizex * j,
    //         espacementY * (i + 1) + sizey * i,
    //         sizex,
    //         sizey
    //       );
    //     } else {
    //       j--;
    //     }
    //     index++;
    //   }
    // }
  }

  static setImage(element, index, ctx, sizex, sizey, images) {
    console.log(`item = ${element}, index = ${index}`);
    ctx.drawImage(images[index], this.getPosX(), this.getPosY(), sizex, sizey);
  }

  static getPosX(index, espacementX, sizex) {
    return espacementX * ((index % 4) + 1) + sizex * (index % 4);
  }
  static getPosY(index, espacementY, levels, sizey) {
    // let rows = this.getRowNb(levels);
    // let modulo = index % rows;
    let currentRow = Math.floor(index / 4);
    // if (modulo === 0) currentRow -= 1;
    console.log("currentrow =" + currentRow);
    // return espacementY * ((index % rows) + 1) + sizey * (index % rows);
    return sizey * currentRow;
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
