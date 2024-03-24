import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { Countries_en } from './language/english/country';

const TELEGRAM_TOKEN = '';

@Injectable()
export class BotService {
  private readonly bot: TelegramBot;
  private logger = new Logger(BotService.name);

  constructor() {
    //initializing thr Telegram bot
    this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

    // Register event listerner for incoming messages
    this.bot.on('message', this.onReceiveMessage);

    // Register event listerner for incomming button commands
    this.bot.on('callback_query', this.handleButtonCommand);
  }

  // Event handler for incoming message
  onReceiveMessage = async (msg: any) => {
    this.logger.debug(msg); // log the message
    const searchTypeKeyboard = [
      [
        { text: '➡️ One way', callback_data: '/oneway' },
        { text: '⬅️➡️ Return', callback_data: '/return' },
      ],
      [{ text: '🔄 Multi-city', callback_data: '/multycity' }],
    ];

    const selectLanguageKeyboard = [
      [{ text: 'English', callback_data: '/english' }],
      [{ text: 'Español', callback_data: '/spanish' }],
      [{ text: 'Русский', callback_data: '/russian' }],
      [{ text: 'Українська', callback_data: '/ukrainian' }],
      [{ text: 'Português (Brasil)', callback_data: '/esp' }],
      [{ text: 'Italian', callback_data: '/portuguese' }],
      [{ text: 'Türkçe', callback_data: '/turkish' }],
      [{ text: 'हिंदी', callback_data: '/hindi' }],
    ];

    // setup the keyboard markup
    const searchReplyMarkup = {
      inline_keyboard: searchTypeKeyboard,
    };

    const selectLanguageMarkup = {
      inline_keyboard: selectLanguageKeyboard,
      force_reply: true,
    };

    // parse incoming message and handle commands
    try {
      // check for messages that are not text
      if (!msg.text) {
        this.bot.sendMessage(
          msg.chat.id,
          'Please select the type of search 👇',
          {
            reply_markup: searchReplyMarkup,
          },
        );
      } else {
        const command = msg.text.toLowerCase();
        console.log('Command :', command);
        if (command === '/start') {
          // send select language menu
          const langauagePrompt = await this.bot.sendMessage(
            msg.chat.id,
            `Please select language.\nПожалуйста, выберите язык.\nБудь ласка, виберіть мову.\nPor favor selecionar o idioma.\nSi prega di selezionare la lingua.\nLütfen dil seçin.\nकृपया एक भाषा चुनिए।`,
            {
              reply_markup: selectLanguageMarkup,
            },
          );
          // keeping in context, to reply when a user selects a language
          console.log(langauagePrompt);
        } else {
          // handle other commands
          // this.handleCommands(msg);
        }
      }
    } catch (error) {
      console.error(error);
      return await this.bot.sendMessage(
        msg.chat.id,
        `Processing command failed, please try again`,
      );
    }
  };

  // handlebuttoncommands
  handleButtonCommand = async (query: any) => {
    let command: string;
    let action: string;

    // function to check if query.data is a json type
    function isJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }

    if (isJSON(query.data)) {
      command = JSON.parse(query.data).command;
      action = JSON.parse(query.data).action;
    } else {
      command = query.data;
    }

    // console.log(query.message.chat.id);
    const chatId = query.message.chat.id;

    const userId = query.from.id;
    console.log(command);

    console.log(userId, chatId);
    try {
      switch (command) {
        case '/english':
          // save the language preference

          this.sendAllCountries(query.message.chat.id, 'english');
          console.log('here');
          return;
        case '/next':
          if (action) {
            console.log('action :', action);
            console.log('message id :', query.message.message_id);
            const changeDisplay = {
              buttonPage: action,
              messageId: query.message.message_id,
            };

            this.sendAllCountries(
              query.message.chat.id,
              'english',
              changeDisplay,
            );
          }
          return;
        case '/prev':
          if (action) {
            console.log('action :', action);
            console.log('message id :', query.message.message_id);
            const changeDisplay = {
              buttonPage: action,
              messageId: query.message.message_id,
            };

            this.sendAllCountries(
              query.message.chat.id,
              'english',
              changeDisplay,
            );
          }
          return;

        default:
          console.log('default');
      }
    } catch (error) {
      console.error(error);
      return await this.bot.sendMessage(
        query.message.chat.id,
        `Processing command failed, please try again`,
      );
    }
  };

  // send all country options
  sendAllCountries = async (chat_id, language, changeDisplay?) => {
    console.log(language);
    let display; // the particular button page to be displayed
    let messageId;
    if (!changeDisplay) {
      display = 'firstDisplay';
    } else {
      display = changeDisplay.buttonPage;
      messageId = changeDisplay.messageId;
      console.log('displayaction :', display);
    }
    try {
      // using switch case to handle different language
      switch (language) {
        case 'english':
          const selectCountry = Countries_en[display];
          // setup the keyboard markup

          const selectCountryMarkup = {
            inline_keyboard: selectCountry,
          };

          if (!messageId) {
            console.log('ebea');
            await this.bot.sendMessage(
              chat_id,
              `Please, Select your country 🌐`,
              {
                reply_markup: selectCountryMarkup,
              },
            );
            return;
          } else {
            console.log('message needs to be edited');
            await this.bot.editMessageReplyMarkup(selectCountryMarkup, {
              chat_id,
              message_id: messageId,
            });
            return;
          }

        default:
          const defaultCountry = Countries_en.firstDisplay;
          // setup the keyboard markup

          const defaultCountryMarkup = {
            inline_keyboard: defaultCountry,
          };
          await this.bot.sendMessage(
            chat_id,
            `Please, Select your country 🌐`,
            {
              reply_markup: defaultCountryMarkup,
            },
          );
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  sendCountryFlag = async (chat_id, language, changeDisplay?) => {
    let displayPage; // the flag display page to be displayed
    let messageId;
  };
}

// await this.bot.onReplyToMessage(
//   msg.chat.id,
//   langauagePrompt.message_id,
//   async (selectedLanguage) => {
//     // save the language to the user Db
//     console.log(selectedLanguage);
//     // const language = selectedLanguage.
//   },
// );
