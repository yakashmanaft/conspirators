
// Создаем Hamster Kombat почти с нуля. Практика по Vue 3 и Telegram Mini Apps
// // https://habr.com/ru/companies/selectel/articles/869618/


// // FastAPI и Vue.js 3: телеграм-бот с MiniApp для записи и автоматических уведомлений. Пишем бэкенд
// // https://habr.com/ru/companies/amvera/articles/873108/

// // name: conspirators.bot
// // username: conspirators_bot
// // import { Telegraf } from "telegraf";

// // const { Telegraf } = require("telegraf");
// import TelegramBot from 'node-telegram-bot-api';

// // Создать бота с полученным ключом
const token = '7746458695:AAGWGZbJ6CwmOMO1Bx-grpXA15aOuTz29wg'
// // const bot = new Telegraf("7746458695:AAFXKyLGJ99zv0JziIa5hFSfxOOQAyYPUK8")

// const bot = new TelegramBot(token, { polling: true });
// // Обработчик начала диалога с ботом
// // bot.start((ctx) =>
// //   ctx.reply(
// //     `Приветствую, ${
// //        ctx.from.first_name ? ctx.from.first_name : "хороший человек"
// //     }! Набери /help и увидишь, что я могу.`
// //   )
// // );

// // // Обработчик простого текста
// // bot.on("text", (ctx) => {
// //   return ctx.reply(ctx.message.text);
// // });

// // Совпадения с "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' - это полученное сообщение из Telegram
//   // 'match' - результат выполнения вышеуказанного регулярного выражения для проверки текстового содержимого  
//   // сообщения

//   const chatId = msg.chat.id;
//   const resp = match[1]; // перехваченный "whatever"

//   // отправка обратно в чат совпавшего "whatever"
//   bot.sendMessage(chatId, resp);
// });

// // Прослушивание сообщений любого вида. Существуют разные виды 
// // сообщений.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // отправка сообщения в чат и подтверждение его получения 
//   bot.sendMessage(chatId, 'Received your message');
// });

// // Запуск бота
// export const launch_bot = () => {
//   // return console.log('gooooo')
//   bot.launch()
// }

// // export default defineEventHandler(async (event) => {
// //   // ... Do whatever you want here
// //   const launch = () => {
// //     bot.launch()
// //   }


// //   return {
// //     launch
// //   }
// // })

import { Bot, GrammyError, HttpError  } from "grammy";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(token); // <-- put your bot token between the ""

bot.catch((err) => { const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`); const e = err.error;
    if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) { 
        console.error('Could not contact Telegram:', e);
    } else {
        console.error('Unknown error:', e);
    }
});
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Вы написали /start"));
// Массив возможных фраз оn пользователя
// bot.command(['say_hello', 'hello', 'say_hi'], async (ctx) => {

//     await ctx.reply('Hello');

// });
bot.command("help", (ctx) => ctx.reply("Вы попросили /help! Выезжаем !"))
bot.command("balance", (ctx) => ctx.reply("Подгружаю /balance! Ждите..."))
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Вы что-то написали... Не могу разглядеть..."));

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.



// Запускаем бота (Вмонтирован в ссылку перехода в телеграм на бота в /help)
export const launch_bot = () => {
  bot.start()
}