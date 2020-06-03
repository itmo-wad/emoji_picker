'use strict';
process.env.NTBA_FIX_319 = 1;

const Emojis = require('../modules/emoji.js'),
      EmojiKeyboard = Emojis.generate_keyboard(),
      TelegramBot = require('node-telegram-bot-api'),
      URL = "https://risibank.fr/cache/stickers/d899/89948-full.png";


function emojiser(input = undefined) {
  Emojis.parser(input).forEach(word => input = input.replace(word[0], (Emojis.local_database()[word[0].slice(1, -1)] || word[0])));
  return input.slice(1, -1)
}

(function () {
  const token = '1219145096:AAG9WWHVSrXUOM41hD6wOSBaVgPVrCORrMM';
  const bot = new TelegramBot(token, {polling: true});

  bot.onText(/\/emojis/, (message) => {
    if (message.text.length > 8)
      bot.sendMessage(message.chat.id, emojiser(`"${message.text.substr(8)}"`));
  });

  bot.onText(/\/search/, (message) => {
    if (message.text.length > 8)
      bot.sendMessage(message.chat.id, (Emojis.local_database()[message.text.substr(8).slice(1, -1)] || "Emoji not found!"));
  });

  bot.onText(/\/list/, (message) => {
    bot.sendMessage(message.chat.id, "Opening emoji keyboard", {
    "reply_markup": {"keyboard": EmojiKeyboard}});
  });

  bot.onText(/\/test/, (message) => {
    bot.sendPhoto(message.chat.id, URL);
  });
}());
