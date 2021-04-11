
module.exports = class DrawCanvas {

    static async drawImages(images, canvas, levelsRemaining, levels) {
        let sizex = 300;
        let sizey = canvas.height / 3 - 25;
        let espacementX = 25;
        let espacementY = 20;
        const ctx = canvas.getContext("2d");
      
        if (levelsRemaining == 1) {
          ctx.drawImage(images[0 + levels[0] - 1], 0, 0, canvas.width, canvas.height);
          return;
        }
      
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      
        if (levels.includes("1")) {
          ctx.drawImage(images[0], espacementX, espacementY, sizex, sizey);
        }
        if (levels.includes("2")) {
          ctx.drawImage(
            images[1],
            espacementX * 2 + sizex,
            espacementY,
            sizex,
            sizey
          );
        }
        if (levels.includes("3")) {
          ctx.drawImage(
            images[2],
            espacementX * 3 + sizex * 2,
            espacementY,
            sizex,
            sizey
          );
        }
        if (levels.includes("4")) {
          ctx.drawImage(
            images[3],
            espacementX,
            espacementY * 2 + sizey,
            sizex,
            sizey
          );
        }
        if (levels.includes("5")) {
          ctx.drawImage(
            images[4],
            espacementX * 2 + sizex,
            espacementY * 2 + sizey,
            sizex,
            sizey
          );
        }
        if (levels.includes("6")) {
          ctx.drawImage(
            images[5],
            espacementX * 3 + sizex * 2,
            espacementY * 2 + sizey,
            sizex,
            sizey
          );
        }
        if (levels.includes("7")) {
          ctx.drawImage(
            images[6],
            espacementX,
            espacementY * 3 + sizey * 2,
            sizex,
            sizey
          );
        }
        if (levels.includes("8")) {
          ctx.drawImage(
            images[7],
            espacementX * 2 + sizex,
            espacementY * 3 + sizey * 2,
            sizex,
            sizey
          );
        }
        if (levels.includes("9")) {
          ctx.drawImage(
            images[8],
            espacementX * 3 + sizex * 2,
            espacementY * 3 + sizey * 2,
            sizex,
            sizey
          );
        }
      }

} 