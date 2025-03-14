
// Создаем Hamster Kombat почти с нуля. Практика по Vue 3 и Telegram Mini Apps
// https://habr.com/ru/companies/selectel/articles/869618/


// FastAPI и Vue.js 3: телеграм-бот с MiniApp для записи и автоматических уведомлений. Пишем бэкенд
// https://habr.com/ru/companies/amvera/articles/873108/

// name: conspirators.bot
// username: conspirators_bot

const { Telegraf } = require("telegraf");

// Создать бота с полученным ключом
const bot = new Telegraf("7746458695:AAFXKyLGJ99zv0JziIa5hFSfxOOQAyYPUK8")

// Обработчик начала диалога с ботом
bot.start((ctx) =>
  ctx.reply(
    `Приветствую, ${
       ctx.from.first_name ? ctx.from.first_name : "хороший человек"
    }! Набери /help и увидишь, что я могу.`
  )
);

// Обработчик простого текста
bot.on("text", (ctx) => {
  return ctx.reply(ctx.message.text);
});

// Запуск бота
const launch = () => {
  
  bot.launch()
}
export default defineEventHandler(async () => {
  return launch()
})