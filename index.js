// Dependencies
const express = require('express');
const app = express();
const Telegraf = require('telegraf')

const bot = new Telegraf('1129108256:AAFzOZOQRIpLTXmXTjodD5bPcrN2VxvcG0k');
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();