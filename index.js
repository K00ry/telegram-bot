const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
//log for development
// const logger = require("morgan");
const axios = require('axios');
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const mongoose = require("mongoose");
const HearSay = require('./models/hearSays').HearsSays;



// Connection to MongoDB Atlas

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


//log for development
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());





//Get Request for refreshing the list on the main Page

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

// Post for Submting the new "hears"field (sentence the bot will react to)

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

// for Deleting the reaction already existed in the list

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


/// Function for Handling client Vue in production deployment

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

////MIDDLEWARE FOR REACTION TO SPECIFIC GIF
bot.use((ctx,next)=>{
    console.log(ctx.update.message.animation);
    if(ctx.update.message.animation){
        if(ctx.update.message.animation.thumb.file_unique_id === 'AQADffcTMAAEJCAAAg' ||
            ctx.update.message.animation.thumb.file_unique_id === 'AQAD9FdhGQAEhYECAAE' ||
            ctx.update.message.animation.thumb.file_unique_id === 'AQADtz8mGQAFegEAAQ'){

            const items = ["kheyli bahale yaroo dobare bezar ino!!",
                "az Koja avordi inaro? ",
                "nader shabihe in yaroo mikhandi.",
            "harki be in mikhande khande dare."];

            let item = items[Math.floor(Math.random() * items.length)];
            ctx.reply(item);
        }
    }
    next();
});

///// THIS MIDDLEWARE IS  WHEN I WANT THE BOT TO ACTION WHEN EVER NADER SAID ANYTHING

bot.use((ctx,next)=>{
    if(ctx.update.message.from.first_name === "Nader"){

            const items = ["Nader jan mersi ke nazareto migi :)",
                "kash man mese to vagheyi boodam!",
                "Nader yani mishe man yerooz mese to khafan va bahal besham?",
                "Nader jan kheyli bahali!!",
                "Kholase ke damet garm ke migi inaro!!"];

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
    'nader khoobi?' +
    "\n"+
    'nader chetoori? ' +
    "\n"+
    'nader bere biyad chand dar miyad?' +
    "\n"+
    'nader mano mibary biroon?' +
    "\n"+
    'nader mikhay beri biroon che shekli hasty?' +
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


////// chat replies!

bot.hears('nader bere biyad chand dar miyad?',(ctx) => ctx.reply('ena!'));
bot.hears('nader kiramo mikhori ya mibary?',(ctx) => ctx.reply('bale khahesh mikonam'));
bot.hears('nader',(ctx) => ctx.reply('haa! chi mikhay???!!' ));
bot.hears('kiramo mikhori?',(ctx) => ctx.reply('befarmayid' ));
bot.hears('kir',(ctx) => ctx.reply('berim sham' ));
bot.hears('koon',(ctx) => ctx.reply('Midam! har chi khasty' ));
bot.hears('kos',(ctx) => ctx.reply('bah bah !!!!' ));
bot.hears('mehran',(ctx) => ctx.reply('afarin aliye' ));
bot.hears('😒',(ctx) => ctx.reply('Khafesho Mehran!' ));
bot.hears('😂😂',(ctx) => ctx.reply('نِمَک!' ));


///image replies!

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

bot.mention('@KooneNaderBot', (ctx) => ctx.reply('sallam mikhay behet bedam?'));

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