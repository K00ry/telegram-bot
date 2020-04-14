const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
// const logger = require("morgan");
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



// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());






app.get('/api',(req,res)=>{

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


app.post("/api/submit-form", (req, res) => {

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

app.get("/api/delete", (req, res) => {
        const idMain = req.query.id;

    HearSay.findOne({_id: idMain}).exec()
        .then(slab => {
            slab.remove();
            res.status(200);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname,'public')));

    //Handle SPA
    app.get(/.*/,(reg,res)=>res.sendFile(__dirname+"/public/index.html"))
}

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

bot.use((ctx,next)=>{
    console.log(ctx.update.message.animation);
    if(ctx.update.message.animation){
        if(ctx.update.message.animation.file_name === "715aca4f-f457-4a41-83d9-7d98de5f4f85.gif.mp4" ||
            ctx.update.message.animation.thumb.file_unique_id === "AQAD3XaPGgAEk1IAAg" ||
            ctx.update.message.animation.file_name === 'IMG_9465.MOV'){

            const items = ["Kire in 👆 Yaroo dahaname, abesham harrooz mipasham roo pestonam!!!😍😍",
                "dare be kose ammam mikhande             👆😒 ",
                "yani yerooz dastam be kire in 👆piremarde mirese ye sucke por tof bezanam vasash?😢",
            "Hamejoore kiresh dahaname khaste nemisham az kire in yaroo!! 👆😍😍"];

            let item = items[Math.floor(Math.random() * items.length)];
            ctx.reply(item);
        }
    }
    next();
});

///// THIS COMMENTED IS WHEN I WANT THE BOT TO ACTION WHEN EVER NADER SAID ANYTHING

bot.use((ctx,next)=>{
    if(ctx.update.message.from.first_name === "Nader"){

            const items = ["Khafesho Nadere Kooni!!?? man Nadere vagheyiam Jaye man harf nazan!!!!",
                "Kiram to ghiyafat nadere taghalobi, cheghad kos migi!!!",
                "Nadere taghalobi! shab kos migi! rooz kos Migi! tabestoon kos migi! zemestoonam to koonet!",
                "Akhe kiram to ghiyafeye taghalobit! nadere kooni! key khafe mishi?🤬",
                "lashoo mibandi ya vasat bebandam nadere taghalobi?😡"];

            let item = items[Math.floor(Math.random() * items.length)];
            ctx.reply(item);
    }

    next();
});





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


///////////// chat replies!!!!!!!!

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