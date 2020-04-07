const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const logger = require("morgan");
const axios = require('axios');
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const mongoose = require("mongoose");
const HearSay = require('./models/hearSays').HearsSays;




mongoose.connect(
    "mongodb+srv://koory:" +
    process.env.MONGO_ATLAS_PW +
    "@pars-jadval-4kkmo.mongodb.net/telebot?retryWrites=true",
    { useNewUrlParser: true,
    useUnifiedTopology: true  },
);

const db = mongoose.connection;

db.on("error", err => {
    console.error("connection error:", err);
});

db.once("open", () => {
    console.log("DB connection successful!");
});



app.use(logger("dev"));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static(path.join(__dirname,'public')));



app.get('/',(req,res)=>{

    // res.send({"kir":"hello abbas"});

    HearSay.find({}, function(err, hears) {
        res.json({
            allHears: hears
        });
        if (err){
           res.json({
               err: err
           })
        }
    });
});


app.post("/submit-form", (req, res) => {

    const hearSay = new HearSay({
        hears: req.body.hears_some,
        says:req.body.says_some
    }).save()
        .then(response => {
            console.log(response);
        })
        .catch(err=>{
            console.log(err);
        });
});
app.get("/delete", (req, res) => {
        const idMain = req.params;
    HearSay.findOne({_id: req.id}).exec()
        .then(slab => {
            console.log(slab);
            console.log(idMain);
            // slab.id(receivedId).remove();
            // slab.save();
            // res.status(200).json(slab);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


bot.use( (ctx,next)=>{

    if(ctx.update.message.text){

    HearSay.findOne({hears: ctx.update.message.text}).exec()
        .then(response => {
            console.log(response);

            if(response){
                ctx.reply(response.says);
            }
        })
        .catch(err => console.log(err));
    }
        next();
} );

// app.use(bot.webhookCallback('/secret-path'));
// bot.telegram.setWebhook('https://telegram-nader.herokuapp.com/secret-path');

bot.use((ctx,next)=>{
    if(ctx.update.message.text){
        ctx.update.message.text = ctx.update.message.text.toLowerCase();
        console.log(ctx.update.message.text);
    }
    console.log(ctx.update.message.from);
    next();
});

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

///// THIS COMMENTED IS WHEN I WANT THE BOT TO ACTION WHEN EVER NADER SAID ANYTHING

// bot.use((ctx,next)=>{
//     if(ctx.update.message.from.first_name === "Nader"){
//     ctx.reply("Khafesho Nadere Kooni!!?? man Nadere vagheyiam Jaye man harf nazan!!!!");
//     }
//
//     next();
// });





bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
});

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
    url: 'https://telegram-nader.herokuapp.com/img/nemak.jpg',
    filename: 'nemak.jpg'
}));
bot.hears('nader mikhay bedi che shekli hasty?',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/img/khanoom.jpg',
    filename: 'khanoom.jpg'
}));

bot.hears('🤣',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/img/nemak.jpg',
    filename: 'nemak.jpg'
}));

bot.hears('nader che shekliye?', (ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/img/shaki.jpg',
    filename: 'shaki.jpg'
}));

bot.hears('nader asabeto begam chika mikoni?',(ctx) => ctx.replyWithPhoto({
    url: 'https://telegram-nader.herokuapp.com/img/block.jpg',
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