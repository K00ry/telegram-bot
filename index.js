const express = require("express");
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());// for parsing application/json

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

const Telegraf = require('telegraf');

const bot = new Telegraf('1129108256:AAFzOZOQRIpLTXmXTjodD5bPcrN2VxvcG0k');
bot.start((ctx) => ctx.reply('Sallam Doostan man Nadere kooni hastam!'));
bot.help((ctx) => ctx.reply('Koon mikhay behet bedam?'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.on('sticker', (ctx) => ctx.replyWithPhoto({
    url: 'https://picsum.photos/200/300/?random',
    filename: 'kitten.jpg'
}));



// app.get('/',function () {
//     axios.get('rest.bandsintown.com/artists/ebi').then(function(res){
//         console.log(res);
//         // ctx.reply('Hey there')
//     }).catch(function (error) {
//         // handle error
//         console.log(error);
//     });
// });

bot.hears('nader che shekliye?', (ctx) => ctx.replyWithPhoto({
    url: 'https://picsum.photos/200/300/?random',
    filename: 'kitten.jpg'
}));

// bot.command('oldschool', (ctx) => ctx.reply('Hello'));
// bot.command('modern', ({ reply }) => reply('Yo'));
// bot.command('hipster', Telegraf.reply('λ'));

// bot.on('text', (ctx) => ctx.reply('Hello World'));
bot.launch();

app.get('/',function (req,res) {

   console.log("ahaaa!")

});


app.listen(process.env.PORT || 5000);