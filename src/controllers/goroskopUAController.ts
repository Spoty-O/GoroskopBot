import { DefaultGoroskop, ScrapObject } from '../models/types.js';
import axios, { AxiosResponse } from 'axios';
import { load } from 'cheerio';

class GoroskopUAController implements DefaultGoroskop {
    async getZodiacSigns(): Promise<ScrapObject[]> {
        try {
            const response: AxiosResponse = await axios.get(process.env.GOROSKOP_UA!);
            const $ = load(response.data);
            const nodes = $('.widget-zodiac_list').find('a').toArray();
            const signs = nodes.map((value) => {
                const object: ScrapObject = { name: $(value).text(), href: $(value).attr('href')!.split('/')[1] };
                return object;
            });
            return signs;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getPredictionType(): Promise<ScrapObject[]> {
        try {
            const response: AxiosResponse = await axios.get(process.env.GOROSKOP_UA!);
            const $ = load(response.data);
            const nodes = $('.widget.widget-zodiac').find('.filter').find('.selector').find('a').toArray();
            const types = nodes.map((value) => {
                const object: ScrapObject = { name: $(value).text(), href: $(value).attr('href')!.split('/')[2] };
                return object;
            });
            return types;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getPrediction(sign: string, type: string): Promise<string> {
        try {
            const response: AxiosResponse = await axios.get(`${process.env.GOROSKOP_UA!}${sign}/${type}/`);
            const $ = load(response.data);
            const results = $('.widget.widget-zodiac').find('.multicol.multicol-2-fixed').find('li').toArray();
            let predictions = '';
            results.forEach((value) => {
                const title = $(value).find('h2').text();
                const main_part = $(value).find('p').text();
                const string = `${title}\n\n${main_part}\n\n`;
                predictions += string;
            });
            return predictions;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new GoroskopUAController();
