const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const logger = require("morgan");
const axios = require('axios');
const Telegraf = require('telegraf');
const bot = new Telegraf('1129108256:AAFzOZOQRIpLTXmXTjodD5bPcrN2VxvcG0k');




app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));


app.post('/',function(req,res){
    console.log(req.body);
    // console.log(res.body);

});

app.use(bot.webhookCallback('/secret-path'));
bot.telegram.setWebhook('https://telegram-nader.herokuapp.com/secret-path');
bot.use((ctx,next)=>{
    if(ctx.update.message.text){
        ctx.update.message.text = ctx.update.message.text.toLowerCase();
        console.log(ctx.update.message.text);
    }
    console.log(ctx.update.message.from);

    next();
});

///// THIS COMMENTED IS WHEN I WANT THE BOT TO ACTION WHEN EVER NADER SAID ANYTHING

// bot.use((ctx,next)=>{
//     if(ctx.update.message.from.first_name === "Nader"){
//     ctx.reply("Khafesho Nadere Kooni!!?? man Nadere vagheyiam Jaye man harf nazan!!!!");
//     }
//
//     next();
// });

bot.use((ctx,next)=>{
    if(ctx.update.message.animation){
    if(ctx.update.message.animation.file_name === "715aca4f-f457-4a41-83d9-7d98de5f4f85.gif.mp4" ||
        ctx.update.message.animation.thumb.file_unique_id=== "AQAD3XaPGgAEk1IAAg"){

    const items = ["Kire in 👆 Yaroo dahaname, abesham harrooz mipasham roo pestonam!!!😍😍",
                    "dare be kose ammam mikhande             👆😒 ",
                    "eeena!! be in pire marde ye joori kooon midam 😍😍😍😍!! nemidoonin ke😍😍!!"];

        let item = items[Math.floor(Math.random() * items.length)];
        ctx.reply(item);

        }
    }


    next();
});



bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
});
// bot.command('lights', ctx => ctx.reply('Hello from the bot side.'));
bot.start((ctx) => ctx.reply('Sallam Doostan man nadere kooni hastam!👹 mitoonid soalate zir ro az man beporsid :' +
    "\n"+
    'nader key miyay?' +
    "\n"+
    'nader chejoori koon midi?' +
    "\n"+
    'nader bere biyad chand dar miyad?' +
    "\n"+
    'nader kiramo mikhori ya mibary?' +
    "\n"+
    'nader mikhay bedi che shekli hasty?' +
    "\n"+
    'nader kojayi?' +
    "\n"+
    'nader che shekliye?' +
    "\n"+
    'khafesho nader' +
    "\n"+
    'nader asabeto begam chika mikoni?'));

bot.help((ctx) => ctx.reply('Koon mikhay behet bedam?'));

bot.hears('nader kojayi?',(ctx) => ctx.replyWithAudio({
    url:'https://telegram-nader.herokuapp.com/voice/khoone.ogg',
    filename:"khoone.ogg"
}));
bot.hears('khafesho nader',(ctx) => ctx.replyWithAudio({
    url:'https://telegram-nader.herokuapp.com/voice/vamonde.ogg',
    filename:"vamonde.ogg"
}));

bot.hears('nader key miyay?',(ctx) => ctx.replyWithAudio({
    url:'https://telegram-nader.herokuapp.com/voice/miyam.ogg',
    filename:"miyam.ogg"
}));
bot.hears('nader chejoori koon midi?',(ctx) => ctx.replyWithAudio({
    url:'https://telegram-nader.herokuapp.com/voice/midam.ogg',
    filename:"midam.ogg"
}));


// chat replies!!!!!!!!


// bot.hears('nader key miyay?',(ctx) => ctx.reply('tamrin kon!! tamriin kon miyam!!!'));
// bot.hears('nader che joori koon midi?',(ctx) => ctx.reply('aval az koonet mikhoram!! badan miparam roosh!!! badan kireto mikonam toosh!! '));
bot.hears('nader bere biyad chand dar miyad?',(ctx) => ctx.reply('eeeeeeennnaaaa!!'));
bot.hears('nader kiramo mikhori ya mibary?',(ctx) => ctx.reply('oskole vamoonde kireto mikhoram ye poolam behet miidam!!!'));
bot.hears('nader',(ctx) => ctx.reply('haa! chi mikhay???!!' ));
bot.hears('kiramo mikhori?',(ctx) => ctx.reply('Haaaa!! Mikhoram😍😍😍!!!!' ));
bot.hears('kir',(ctx) => ctx.reply('Mikhoram😍😍😍!!!!' ));
bot.hears('koon',(ctx) => ctx.reply('Midam😍😍😍!!!!' ));
bot.hears('kos',(ctx) => ctx.reply('ah ah !!!!' ));
bot.hears('mehran',(ctx) => ctx.reply('ah ah Piff Piff, nekbat kiram dahanesh!!!!!' ));
bot.hears('😒',(ctx) => ctx.reply('Khafesho Mehran!!!' ));
bot.hears('😂😂',(ctx) => ctx.reply('نِمَک!!!' ));


///image replies!!!!!!!!!!!!!!!

bot.hears('😂',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/nemak.jpg',
    filename: 'nemak.jpg'
}));
bot.hears('nader mikhay bedi che shekli hasty?',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/khanoom.jpg',
    filename: 'khanoom.jpg'
}));

bot.hears('🤣',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/nemak.jpg',
    filename: 'nemak.jpg'
}));

bot.hears('nader che shekliye?', (ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/shaki.jpg',
    filename: 'shaki.jpg'
}));

bot.hears('nader asabeto begam chika mikoni?',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/block.jpg',
    filename: 'block.jpg'
}));





bot.mention('@KooneNaderBot', (ctx) => ctx.reply('Koon mikhay behet bedam?'));








bot.launch();

app.get('/',function (req,res) {

   console.log("ahaaa!")

});
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
        error:{
            message:error.message
        }
    });
});


app.listen(process.env.PORT || 3000);