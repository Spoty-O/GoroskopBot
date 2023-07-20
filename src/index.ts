import { Telegraf, session } from 'telegraf';
import dotenv from 'dotenv';
import Keyboard from './controllers/keyboardController.js';
import goroskopUAController from './controllers/goroskopUAController.js';
import { MyContext } from './models/types.js';

dotenv.config();
const bot: Telegraf = new Telegraf<MyContext>(process.env.BOT_TOKEN!);
bot.use(session({ defaultSession: () => ({ zodiac_sign: undefined }) }));

bot.start(async (ctx: MyContext) => {
    try {
        ctx.reply(`Hello, my name is HoroscopeBot, I am your assistant in getting predictions for the day.`);
        ctx.reply(`Let's choose your sign.`, Keyboard.getZodiacSignsMarkup())
    } catch (error) {
        console.log(error);
    }
});

bot.hears('Назад', async (ctx: MyContext) => {
    try {
        ctx.reply(
            `Let's choose your sign.`,
            Keyboard.getZodiacSignsMarkup(),
        );
    } catch (error) {
        console.log(error);
    }
});

async function start(): Promise<void> {
    try {
        const signs = await goroskopUAController.getZodiacSigns();
        const types = await goroskopUAController.getPredictionType();
        Keyboard.setPredictionTypeMarkup(types);
        Keyboard.setZodiacSignsMarkup(signs);
        for (const value of signs) {
            bot.hears(value.name, async (ctx: MyContext) => {
                try {
                    ctx.session!.zodiac_sign = value.href;
                    ctx.reply(
                        `Okay, now you need to choose the type of prediction.`,
                        Keyboard.getPredictionTypeMarkup(),
                    );
                } catch (error) {
                    console.log(error);
                }
            });
        }
        for (const value of types) {
            bot.hears(value.name, async (ctx: MyContext) => {
                try {
                    ctx.reply(
                        `${await goroskopUAController.getPrediction(ctx.session!.zodiac_sign!, value.href)}`,
                        Keyboard.getPredictionTypeMarkup(),
                    );
                } catch (error) {
                    console.log(error);
                }
            });
        }
        bot.launch();
    } catch (error) {
        console.log('Bot start error!');
    }
}
start();
