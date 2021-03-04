const Discord = require('discord.js');
const Canvas = require('canvas');
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const allStages = process.env.ALLSTAGES;
const allImages = {
  "0" : "http://www.donsefactory.com/wp-content/uploads/2021/02/DF-2.jpg",
  "1" : "http://www.donsefactory.com/wp-content/uploads/2021/02/CB-2.jpg",
  "2" : "http://www.donsefactory.com/wp-content/uploads/2021/02/SB-2.jpg",
  "3" : "http://www.donsefactory.com/wp-content/uploads/2021/02/Smashville-2.jpg",
  "4" : "http://www.donsefactory.com/wp-content/uploads/2021/02/Kalos-2.jpg",
  "5" : "http://www.donsefactory.com/wp-content/uploads/2021/02/Ville-2.jpg",
  "6" : "http://www.donsefactory.com/wp-content/uploads/2021/02/Yoshi-2.jpg",
  "7" : "http://www.donsefactory.com/wp-content/uploads/2021/02/SP2-2.jpg",
  "8" : "http://www.donsefactory.com/wp-content/uploads/2021/02/Lylat-2.jpg"
};

let images;
let currentUsers = [];

const filter = response => {return levels.includes(response.content) && (response.author === user1 || response.author === user2)};

function getUserFromMention(mention)
{
  if (!mention) return;
  const matches = mention.match(/^<@!?(\d+)>$/);
  if (!matches) return;

  const id = matches[1];
  return client.users.cache.get(id);
}

function checkAnswers(response, levels, userWanted)
{
  if (response.author != userWanted)
    return false;
  let reponses = response.content.trim().split(/ +/);
  return reponses.every((t) => levels.includes(t));
}

function getUserWanted(user1, user2, tour, levelsRemaining)
{
  if (tour == 1)
  {
    if (levelsRemaining > 6)
      return user1;
    else if (levelsRemaining > 2)
      return user2;
    else
      return user1;
  }
  else
  {
    if (levelsRemaining > 6)
      return user1;
    else
      return user2;
  }
}

function sendUsage(message)
{
  message.reply(`usage : \`${prefix}stage @participant1 @participant2 [option : tour2]\`\n For any questions ask Steyo`);
}

function GetMessageToSend(userWanted, levelsNbToBan)
{
  if (levelsNbToBan[0] == 1 && levelsNbToBan.length == 1)
    return `${userWanted} **Bannis le dernier stage**`;
  else
    return `${userWanted} **Envoie le/les numero du stage que tu veux bannir, ${levelsNbToBan[0]} restants**`;
}

async function drawImages(ctx, images, canvas, levelsRemaining, levels)
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

async function chooseStage(user1, user2, args, message)
{
  let levels = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let levelsRemaining = 9;
  let userWanted;
  let reponses;
  let levelsNbToBan;
  let tour;
  const canvas = Canvas.createCanvas(1000, 700);
  const ctx = canvas.getContext('2d');

  if (args.length > 2 && (["2", "3", "tour2", "tour3"].includes(args[2].toLowerCase())))
  {
    tour = 2;
    levelsNbToBan = [3, 5];
  }
  else
  {
    tour = 1;
    levelsNbToBan = [3, 4, 1];
  }
  while (levelsRemaining > 1)
  {
    let image1;
    userWanted = getUserWanted(user1, user2, tour, levelsRemaining);
    if (levelsRemaining == 9)
      image1 = {files : [allStages]};
    else
    {
      await drawImages(ctx, images, canvas, levelsRemaining, levels);
      image1 = new Discord.MessageAttachment(canvas.toBuffer(), 'Remaining_Stages.jpg');
    }

    await message.channel.send(GetMessageToSend(userWanted, levelsNbToBan), image1)
      .then(async () => {
        let userMessage = await message.channel.awaitMessages((response) => checkAnswers(response, levels, userWanted), {max: 1, time: 60000, errors: ['time']})
          .then(collected => {
            reponses = collected.first().content.trim().split(/ +/);
            if (reponses.length > levelsNbToBan[0])
              reponses.splice(levelsNbToBan[0], reponses.length - levelsNbToBan[0]);
            levels = levels.filter(word => !reponses.includes(word));
            levelsRemaining = levels.length;
            levelsNbToBan[0] -= reponses.length;
            if (levelsNbToBan[0] == 0)
              levelsNbToBan.shift();
          })
          .catch(error => {
            message.channel.send(`${user1} ${user2} timeout`);
            console.log(error);
            levelsRemaining = 0;
          })
      })
      .catch(error => {
        console.log(error);
        levelsRemaining = 0;
      });
  }
  if (levelsRemaining === 1)
  {
    message.channel.send(`${user1} ${user2} Que le match commence !`, {files : [allImages[levels[0] - 1]]})
    .catch((error) => {console.log(error)});
  }
}

client.once('ready', async () =>
{
  console.log("Nb de serveurs utilisant le bot : " + client.guilds.cache.size);
  client.user.setActivity('!stage', { type: 'PLAYING' });
  images = await Promise.all(Object.values(allImages).map(element => Canvas.loadImage(element)));
});

client.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.mentions.users.size != 2 || command.toLowerCase() != "stage")
      sendUsage(message);
    else
    {
      let user1 = getUserFromMention(args[0]);
      let user2 = getUserFromMention(args[1]);

      if (!user1 || !user2 )
        sendUsage(message);
      else if(user1 != message.author && user2 != message.author)
        sendUsage(message);
      else
      {
        if (currentUsers.includes(args[0]))
          return message.reply(`${user1} est déja en train de choisir un terrain`);
        else if (currentUsers.includes(args[1]))
          return message.reply(`${user2} est déja en train de choisir un terrain`);
        else
        {
          currentUsers.push(args[0], args[1]);
          await chooseStage(user1, user2, args, message);
          currentUsers = currentUsers.filter(function (value, index, arr){
            return value != args[0] && value != args[1];
          });
        }
      }
    }
});

client.login(process.env.BOT_TOKEN);
