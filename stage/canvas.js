module.exports = class DrawCanvas {
  static async drawImages(images, canvas, levelsRemaining, levels) {
    let sizex = 300;
    let sizey = canvas.height / 3 - 25;
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
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // const imageIndex = i * j;
        if (levels.includes((index + 1).toString())) {
          ctx.drawImage(
            images[index],
            espacementX * (j + 1) + sizex * j,
            espacementY * (i + 1) + sizey * i,
            sizex,
            sizey
          );
        }
        index++;
      }
    }
  }
};
