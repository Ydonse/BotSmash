const config = require ('./config.json');
const Discord = require('discord.js');
const Canvas = require('canvas');
const client = new Discord.Client();
const prefix = config.prefix;

let levels = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let levelsRemaining = 9;
let userWanted;
let user1;
let user2;
let reponses;
let levelsNbToBan;
let tour;
const filter = response => {console.log(levels.includes(response.content));return levels.includes(response.content) && (response.author === user1 || response.author === user2)};
function getUserFromMention(mention)
{
  if (!mention) return;
  const matches = mention.match(/^<@!?(\d+)>$/);
  if (!matches) return;

  const id = matches[1];
  return client.users.cache.get(id);
}

function checkAnswers(response)
{
  reponses = response.content.trim().split(/ +/);
  return reponses.every((t) => levels.includes(t));
}

function sendUsage(message)
{
  message.reply(`usage : \`${prefix}stage @participant1 @participant2 [option : tour2]\`\n For any questions ask Steyo`);
}

function GetMessageToSend(user1, user2)
{
  const messageGenerique = `**Envoie le numero du stage que tu veux bannir, ${levelsNbToBan[0]} restants**`;
  if (tour == 1)
  {
    if (levelsRemaining > 6)
    {
      userWanted = user1;
      return `${userWanted} ` + messageGenerique;
    }
    else if (levelsRemaining > 2)
    {
      userWanted = user2;
      return `${userWanted} ` + messageGenerique;
    }

    else
    {
      userWanted = user1;
      return `${user1} **Bannie le dernier stage**`;
    }
  }
  else
  {
    if (levelsRemaining > 5)
    {
      userWanted = user1;
      return `${userWanted} ` + messageGenerique;
    }
  }


}

function drawImages(ctx, images, canvas)
{
  let sizex = 300;
  let sizey = canvas.height / 3 - 25;
  let espacementX = 25;
  let espacementY = 20;

  if (levelsRemaining == 1)
  {
    ctx.drawImage(images[0 + levels[0] - 1], 0, 0, canvas.width, canvas.height);
    return;
  }


  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  if (levels.includes("1")) {ctx.drawImage(images[0], espacementX, espacementY, sizex, sizey);}
  if (levels.includes("2")) {ctx.drawImage(images[1], espacementX * 2 + sizex, espacementY, sizex, sizey);}
  if (levels.includes("3")) {ctx.drawImage(images[2], espacementX * 3 + sizex * 2, espacementY, sizex, sizey);}
  if (levels.includes("4")) {ctx.drawImage(images[3], espacementX, espacementY * 2 + sizey, sizex, sizey);}
  if (levels.includes("5")) {ctx.drawImage(images[4], espacementX * 2 + sizex, espacementY * 2 + sizey, sizex, sizey);}
  if (levels.includes("6")) {ctx.drawImage(images[5], espacementX * 3 + sizex * 2, espacementY * 2 + sizey, sizex, sizey);}
  if (levels.includes("7")) {ctx.drawImage(images[6], espacementX, espacementY * 3 + sizey * 2, sizex, sizey);}
  if (levels.includes("8")) {ctx.drawImage(images[7], espacementX * 2 + sizex, espacementY * 3 + sizey * 2, sizex, sizey);}
  if (levels.includes("9")) {ctx.drawImage(images[8], espacementX * 3 + sizex * 2, espacementY * 3 + sizey * 2, sizex, sizey);}
}
client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.mentions.users.size != 2)
      sendUsage(message);

    else
    {
      user1 = getUserFromMention(args[0]);
      user2 = getUserFromMention(args[1]);

      if (!user1 || !user2)
        sendUsage(message);
      else
      {
        const canvas = Canvas.createCanvas(1000, 700);
        const ctx = canvas.getContext('2d');
        let images = await Promise.all(Object.values(config.URLS).map(element => Canvas.loadImage(element)));
        //console.log(args);
        if (args.length > 2 && (["2", "3", "tour2", "tour3"].includes(args[2].toLowerCase())))
        {
          console.log("tour2");
          tour = 2;
          levelsNbToBan = [3, 5];
        }
        else
        {
          console.log("tour1");
          tour = 1;
          levelsNbToBan = [3, 4, 1];
        }
        while (levelsRemaining > 1)
        {
          drawImages(ctx, images, canvas);
          let image1 = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
          await message.channel.send(GetMessageToSend(user1, user2), image1)
            .then(async () => {
              let userMessage = await message.channel.awaitMessages(checkAnswers, {max: 1, time: 60000, errors: ['time']})
                .then(collected => {
                  if (reponses.length > levelsNbToBan[0])
                    reponses.splice(levelsNbToBan[0], reponses.length - levelsNbToBan[0]);
                  console.log(levelsNbToBan);
                  levels = levels.filter(word => !reponses.includes(word));
                  levelsRemaining = levels.length;
                  levelsNbToBan[0] -= reponses.length;
                  if (levelsNbToBan[0] == 0)
                    levelsNbToBan.shift();
                })
                .catch(collected => {
                  message.channel.send(`${user1} ${user2} timeout`);
                  levelsRemaining = 0;
                })
            })
            .catch(collected => {
              console.log("fail !");
            });
        }
        if (levelsRemaining === 1)
        {
          //drawImages(ctx, images, canvas);
          //let image1 = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
          console.log(config.URLS[levels[0] - 1]);
          //console.log(levels[0]);
          //message.channel.send(config.URLS[levels[0]]);
          message.channel.send(`${user1} ${user2} Que le match commence !`, {files : [config.URLS[levels[0] - 1]]});
        }
      }
    }
});

client.login(config.token);
