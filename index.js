const express = require("express");
const path = require('path');
const app = express();
const axios = require('axios');
const Telegraf = require('telegraf');
const AnyCase = require('telegraf-anycase-commands');
const bot = new Telegraf('1129108256:AAFzOZOQRIpLTXmXTjodD5bPcrN2VxvcG0k');
const commandArgsMiddleware = require('./commandArgs');
app.use(express.static(path.join(__dirname,'public')));


bot.use(AnyCase.lowercase());
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());// for parsing application/json
//
// app.use(
//     bodyParser.urlencoded({
//         extended: true
//     })
// );
// app.use(express.urlencoded({ extended: false }));


// app.get("/users", (req, res) => {
//     res.json([
//         { name: "William", location: "Abu Dhabi" },
//         { name: "Chris", location: "Vegas" }
//     ]);
// });
//
// app.post("/user", (req, res) => {
//     const { name, location } = req.body;
//
//     res.send({ status: "User created", name, location });
// });

bot.use(  (ctx,next) =>{
    ctx.update.message.text.toLowerCase();

    next();
});


bot.hears('Jaber', ctx => {
    console.log(ctx.update.message.text); // command object
});
// bot.command('lights', ctx => ctx.reply('Hello from the bot side.'));
bot.start((ctx) => ctx.reply('Sallam Doostan man Nadere kooni hastam! mitoonid soalate zir ro az man beporsid :' +
    "\n"+
    'Nader key miyay?' +
    "\n"+
    'Nader che joori koon midi?' +
    "\n"+
    'Nader bere biyad chand dar miyad?' +
    "\n"+
    'Nader kiramo mikhori ya mibary?'));
bot.help((ctx) => ctx.reply('Koon mikhay behet bedam?'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.on('sticker', (ctx) => ctx.replyWithPhoto({
//     url: 'https://picsum.photos/200/300/?random',
//     filename: 'kitten.jpg'
// }));
//  ()=>{
//     let string = ctx;
//     ctx.toLowerCase();
// };
bot.use(commandArgsMiddleware());


bot.hears('Nader key miyay?',(ctx) => ctx.reply('tamrin kon!! tamriin kon miyam!!!'));
bot.hears('Nader che joori koon midi?',(ctx) => ctx.reply('aval az koonet mikhoram!! badan miparam roosh!!! badan kireto mikonam toosh!! '));
bot.hears('Nader bere biyad chand dar miyad?',(ctx) => ctx.reply('eeeeeeennnaaaa!!'));
bot.hears('Nader kiramo mikhori ya mibary?',(ctx) => ctx.reply('oskole vamoonde kireto mikhoram ye poolam behet miidam!!!'));
bot.hears('Nader',(ctx) => ctx.reply('haa! chi mikhay???!!' ));
bot.hears('kir',(ctx) => ctx.reply('Mikhoram😍😍😍!!!!' ));
// bot.hears('😂',(ctx) => ctx.reply('نِمَک!!!' ));
// bot.hears('😂',(ctx) => ctx.replyWithPhoto({
//     url: 'https://telegram-bot-eight.now.sh/nemak.jpg',
//     filename: 'nemak.jpg'
// }));

// bot.hears('🤣',(ctx) => ctx.replyWithPhoto({
//     url: 'https://telegram-bot-eight.now.sh/nader-shaki.jpg',
//     filename: 'nader-shaki.jpg'
// }));
// bot.hears('😁',(ctx) => ctx.replyWithPhoto({
//     url: 'https://telegram-bot-eight.now.sh/nader.png',
//     filename: 'nader.png'
// }));
bot.hears('😒',(ctx) => ctx.reply('Khafesho Mehran!!!' ));




bot.mention('@KooneNaderBot', (ctx) => ctx.reply('Koon mikhay behet bedam?'));



//
bot.hears('nader che shekliye?', (ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-bot-eight.now.sh/nader.png',
    filename: 'nader.png'
}));


bot.launch();

app.get('/',function (req,res) {

   console.log("ahaaa!")

});


app.listen(process.env.PORT || 3000);