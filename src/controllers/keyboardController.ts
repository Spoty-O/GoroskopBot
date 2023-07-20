import { Markup } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/types';
import { ScrapObject } from '../models/types.js';

class KeyboardController {
    zodiacSignsMarkup: Markup.Markup<ReplyKeyboardMarkup> | undefined;
    predictionTypeMarkup: Markup.Markup<ReplyKeyboardMarkup> | undefined;

    setZodiacSignsMarkup(array: ScrapObject[]): void {
        this.zodiacSignsMarkup = Markup.keyboard(
            array.map((value) => {
                return value.name;
            }),
        ).resize(true);
    }

    getZodiacSignsMarkup(): Markup.Markup<ReplyKeyboardMarkup> {
        return this.zodiacSignsMarkup!;
    }

    setPredictionTypeMarkup(array: ScrapObject[]): void {
        const arr = array.map((value) => {
            return value.name;
        });
        arr.push('Назад');
        this.predictionTypeMarkup = Markup.keyboard(arr).resize(true);
    }

    getPredictionTypeMarkup(): Markup.Markup<ReplyKeyboardMarkup> {
        return this.predictionTypeMarkup!;
    }
}

export default new KeyboardController();
