import TelegramBot = require("node-telegram-bot-api");


export default interface IStorage {
    chatId: number;
    message: TelegramBot.Message;
    field: string;
    isFieldEnabled: boolean;
}