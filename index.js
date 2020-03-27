const express = require("express");
const path = require('path');
const app = express();
const axios = require('axios');

var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname,'public')));
// app.use(bodyParser.json());// for parsing application/json
//
// app.use(
//     bodyParser.urlencoded({
//         extended: true
//     })
// );
app.use(express.urlencoded({ extended: false }));


app.get("/users", (req, res) => {
    res.json([
        { name: "William", location: "Abu Dhabi" },
        { name: "Chris", location: "Vegas" }
    ]);
});

app.post("/user", (req, res) => {
    const { name, location } = req.body;

    res.send({ status: "User created", name, location });
});
// app.use('/public/img', express.static(__dirname + '/public/img'));

const Telegraf = require('telegraf');

const bot = new Telegraf('1129108256:AAFzOZOQRIpLTXmXTjodD5bPcrN2VxvcG0k');
bot.start((ctx) => ctx.reply('Sallam Doostan man Nadere kooni hastam! mitoonid soalate zir ro az man beporsid :' +
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
bot.hears('nader key miyay?',(ctx) => ctx.reply('tamrin kon!! tamriin kon miyam!!!'));
bot.hears('nader che joori koon midi?',(ctx) => ctx.reply('aval az koonet mikhoram!! badan miparam roosh!!! badan kireto mikonam toosh!! '));
bot.hears('nader bere biyad chand dar miyad?',(ctx) => ctx.reply('eeeeeeennnaaaa!!'));
bot.hears('nader kiramo mikhori ya mibary?',(ctx) => ctx.reply('oskole vamoonde kireto mikhoram ye poolam behet miidam!!!'));

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