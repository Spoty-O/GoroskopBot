import { Context } from 'telegraf';

interface SessionData {
    zodiac_sign?: string;
}

interface MyContext extends Context {
    session?: SessionData;
}

interface ScrapObject {
    name: string;
    href: string;
}

interface DefaultGoroskop {
    getZodiacSigns(): Promise<ScrapObject[]>;
    getPredictionType(): Promise<ScrapObject[]>;
    getPrediction(sign: string, type: string): Promise<string>;
}

export { DefaultGoroskop, ScrapObject, MyContext };
