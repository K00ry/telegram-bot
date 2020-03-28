const express = require("express");
const path = require('path');
const app = express();
const axios = require('axios');
const Telegraf = require('telegraf');
const bot = new Telegraf('1129108256:AAFzOZOQRIpLTXmXTjodD5bPcrN2VxvcG0k');
app.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook('https://telegram-nader.herokuapp.com/secret-path');


app.use(express.static(path.join(__dirname,'public')));


bot.use((ctx,next)=>{
    ctx.update.message.text = ctx.update.message.text.toLowerCase();
    console.log(ctx.update.message.text);
    next();
});

bot.hears('Jaber', ctx => {
    console.log(ctx.update.message.text);
});


// bot.command('lights', ctx => ctx.reply('Hello from the bot side.'));
bot.start((ctx) => ctx.reply('Sallam Doostan man nadere kooni hastam! mitoonid soalate zir ro az man beporsid :' +
    "\n"+
    'nader key miyay?' +
    "\n"+
    'nader che joori koon midi?' +
    "\n"+
    'nader bere biyad chand dar miyad?' +
    "\n"+
    'nader kiramo mikhori ya mibary?'));
bot.help((ctx) => ctx.reply('Koon mikhay behet bedam?'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.on('sticker', (ctx) => ctx.replyWithPhoto({
//     url: 'https://picsum.photos/200/300/?random',
//     filename: 'kitten.jpg'
// }));

// bot.use(commandArgsMiddleware());


bot.hears('nader key miyay?',(ctx) => ctx.reply('tamrin kon!! tamriin kon miyam!!!'));
bot.hears('nader che joori koon midi?',(ctx) => ctx.reply('aval az koonet mikhoram!! badan miparam roosh!!! badan kireto mikonam toosh!! '));
bot.hears('nader bere biyad chand dar miyad?',(ctx) => ctx.reply('eeeeeeennnaaaa!!'));
bot.hears('nader kiramo mikhori ya mibary?',(ctx) => ctx.reply('oskole vamoonde kireto mikhoram ye poolam behet miidam!!!'));
bot.hears('nader',(ctx) => ctx.reply('haa! chi mikhay???!!' ));
bot.hears('kir',(ctx) => ctx.reply('Mikhoram😍😍😍!!!!' ));
bot.hears('koon',(ctx) => ctx.reply('Midam😍😍😍!!!!' ));
bot.hears('kos',(ctx) => ctx.reply('ah ah !!!!' ));
bot.hears('mehran',(ctx) => ctx.reply('ah ah Piff Piff, nekbat kiram dahanesh!!!!!' ));
// bot.hears('😂',(ctx) => ctx.reply('نِمَک!!!' ));
bot.hears('😂',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/nemak.jpg',
    filename: 'nemak.jpg'
}));
bot.hears('nader joon',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/khanoom.jpg',
    filename: 'khanoom.jpg'
}));

bot.hears('🤣',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/nemak.jpg',
    filename: 'nemak.jpg'
}));
// bot.hears('😁',(ctx) => ctx.replyWithPhoto({
//     url: 'https://telegram-nader.herokuapp.com/nader.png',
//     filename: 'nader.png'
// }));
bot.hears('😒',(ctx) => ctx.reply('Khafesho Mehran!!!' ));




bot.mention('@KoonenaderBot', (ctx) => ctx.reply('Koon mikhay behet bedam?'));



//
bot.hears('nader che shekliye?', (ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/nader.png',
    filename: 'nader.png'
}));


bot.launch();

app.get('/',function (req,res) {

   console.log("ahaaa!")

});
bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
});

app.listen(process.env.PORT || 3000);