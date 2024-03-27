import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { Countries_en } from './keyboardMarkups/country';
import { currencies_en } from './keyboardMarkups/currency';
import { welcomeMessageMarkup_en } from './keyboardMarkups/welcome';
import { searchType } from './keyboardMarkups/search';
import { premiumDeal } from './keyboardMarkups/premiumDeal';
import { selectLanguage } from './keyboardMarkups/selectLanguage';
import { ConfigService } from '@nestjs/config';

// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

@Injectable()
export class BotService {
  private readonly bot: TelegramBot;
  private logger = new Logger(BotService.name);
  private userStates = {}; // to monitor a usersState(will be moved to the db later)

  constructor(private config: ConfigService) {
    //initializing thr Telegram bot
    this.bot = new TelegramBot(this.config.get('TELEGRAM_TOKEN'), {
      polling: true,
    });

    // Register event listerner for incoming messages
    this.bot.on('message', this.onReceiveMessage);

    // Register event listerner for incomming button commands
    this.bot.on('callback_query', this.handleButtonCommand);
  }

  // Event handler for incoming message
  onReceiveMessage = async (msg: any) => {
    this.logger.debug(msg); // log the message

    // setup the keyboard markup
    const searchReplyMarkup = {
      inline_keyboard: searchType.searchTypeMarkup,
    };

    // parse incoming message and handle commands
    try {
      const state = this.userStates[msg.chat.id];
      // check for messages that are not text
      if (!msg.text && !state) {
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
          // create a state for the user
          this.userStates[msg.chat.id] = {
            language: undefined,
            country: undefined,
          };
          // send select language menu
          return await this.selectLanguageLayout(msg.chat.id);
          // keeping in context, to reply when a user selects a language
        } else {
          if (state && !state.language) {
            return this.selectLanguageLayout(msg.chat.id);
          } else if (state && !state.country) {
            await this.sendAllCountries(msg.chat.id, state.language);
          } else {
            switch (command) {
              default:
                const welcomeMessage = welcomeMessageMarkup_en.welcome;
                const welcomeMessageMarkup = {
                  inline_keyboard: welcomeMessage,
                };
                await this.bot.sendMessage(
                  msg.chat.id,
                  `Alright, please choose what we will do 👇`,
                  { reply_markup: welcomeMessageMarkup },
                );
            }
          }
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
    let country: string;
    let currency: string;
    const first_name = query.from.first_name;
    const last_name = query.from.last_name;
    // const user_Id = query.from.id;
    const username = `${first_name} ${last_name}`;
    let searchLanguage: string;

    // function to check if query.data is a json type
    function isJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }

    // function to split country from language
    function splitword(word) {
      return word.split('_');
    }

    if (isJSON(query.data)) {
      command = JSON.parse(query.data).command;
      action = JSON.parse(query.data).action;
      country = JSON.parse(query.data).country;
      currency = JSON.parse(query.data).currency;
      searchLanguage = JSON.parse(query.data).language;
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
          this.userStates[chatId] = {
            language: 'english',
            country: undefined,
          };
          this.sendAllCountries(query.message.chat.id, 'english');
          console.log('here');
          return;

        case '/countrySelected':
          if (country) {
            const [countryName, language] = splitword(country);
            console.log('selected country :', countryName);
            // save users country
            delete this.userStates[chatId];
            await this.sendCountryCurrency(chatId, language);
            return;
          }

          return;

        case '/currencySelected':
          if (currency) {
            const [countryCurrency, language] = splitword(currency);
            console.log('selected currency :', countryCurrency);
            // save users country currency
            await this.welcomeMessage(chatId, language, username);
          }

          return;

        case '/nextCountryPage':
          if (action) {
            const [btnPage, language] = splitword(action);
            console.log('action :', action);
            console.log('message id :', query.message.message_id);

            const changeDisplay = {
              buttonPage: btnPage,
              messageId: query.message.message_id,
            };

            this.sendAllCountries(
              query.message.chat.id,
              language,
              changeDisplay,
            );
            return;
          } else {
            return;
          }

        case '/prevCountryPage':
          if (action) {
            console.log('action :', action);
            console.log('message id :', query.message.message_id);

            const [btnPage, language] = splitword(action);
            console.log('action :', action);
            console.log('message id :', query.message.message_id);

            const changeDisplay = {
              buttonPage: btnPage,
              messageId: query.message.message_id,
            };

            this.sendAllCountries(
              query.message.chat.id,
              language,
              changeDisplay,
            );
            return;
          }
          return;

        case '/nextCurrencyPage':
          if (action) {
            console.log('action :', action);
            console.log('message id :', query.message.message_id);
            const changeDisplay = {
              buttonPage: action,
              messageId: query.message.message_id,
            };

            this.sendCountryCurrency(
              query.message.chat.id,
              'english',
              changeDisplay,
            );
            return;
          }
          return;

        case '/prevCurrencyPage':
          if (action) {
            console.log('action :', action);
            console.log('message id :', query.message.message_id);
            const changeDisplay = {
              buttonPage: action,
              messageId: query.message.message_id,
            };

            this.sendCountryCurrency(
              query.message.chat.id,
              'english',
              changeDisplay,
            );
            return;
          }
          return;
        case '/newSearch':
          if (searchLanguage) {
            return await this.searchFlightLayout(
              query.message.chat.id,
              searchLanguage,
            );
          }
          return;
        case '/premiumDeals':
          if (searchLanguage) {
            return await this.sendPremiumDealLayout(
              query.message.chat.id,
              searchLanguage,
            );
          }
          return;

        case '/menu':
          if (searchLanguage) {
            return await this.defaultMenuLyout(
              query.message.chat.id,
              searchLanguage,
            );
          }
          return;

        case '/settings':
          // this.userStates[query.message.chat.id];
          this.userStates[query.message.chat.id] = {
            language: undefined,
            country: undefined,
          };
          return this.selectLanguageLayout(query.message.chat.id);

          return await this.defaultMenuLyout(
            query.message.chat.id,
            searchLanguage,
          );

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

  selectLanguageLayout = async (chat_id) => {
    const selectLanguageMarkup = {
      inline_keyboard: selectLanguage.selectLanguageKeyboard,
      force_reply: true,
    };
    try {
      await this.bot.sendMessage(
        chat_id,
        `Please select language.\nПожалуйста, выберите язык.\nБудь ласка, виберіть мову.\nPor favor selecionar o idioma.\nSi prega di selezionare la lingua.\nLütfen dil seçin.\nकृपया एक भाषा चुनिए।`,
        {
          reply_markup: selectLanguageMarkup,
        },
      );
    } catch (error) {
      console.log(error);
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

  sendCountryCurrency = async (chat_id, language, changeDisplay?) => {
    let displayPage; // the flag display page to be displayed
    let messageId;
    if (!changeDisplay) {
      displayPage = 'firstDisplay';
    } else {
      displayPage = changeDisplay.buttonPage;
      messageId = changeDisplay.messageId;
    }

    try {
      switch (language) {
        case 'english':
          const selectCurrency = currencies_en[displayPage];

          const selectCurrencyMarkup = {
            inline_keyboard: selectCurrency,
          };

          if (!messageId) {
            await this.bot.sendMessage(chat_id, 'Choose your currency 💱', {
              reply_markup: selectCurrencyMarkup,
            });
            return;
          } else {
            await this.bot.editMessageReplyMarkup(selectCurrencyMarkup, {
              chat_id,
              message_id: messageId,
            });
            return;
          }

        default:
          const defaultCurrency = currencies_en.firstDisplay;
          const defaultCurrencyMarkup = {
            inline_keyboard: defaultCurrency,
          };
          await this.bot.sendMessage(chat_id, 'Choose your currency 💱', {
            reply_markup: defaultCurrencyMarkup,
          });
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  welcomeMessage = async (chat_id, language, userName) => {
    try {
      switch (language) {
        case 'english':
          const welcomeMessage = welcomeMessageMarkup_en.welcome;
          const welcomeMessageMarkup = { inline_keyboard: welcomeMessage };
          await this.bot.sendMessage(
            chat_id,
            `Hi ${userName}! 👋 Welcome to FlightBookin bot. Here is what I can do:\n\n– Search for cheapest flights 🔎\n– Track tickets prices 👀\n– Notify about price changes 🔔\n\nShall we start? 👇`,
            { reply_markup: welcomeMessageMarkup },
          );
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  defaultMenuLyout = async (chat_id, language) => {
    try {
      switch (language) {
        case 'english':
          const welcomeMessage = welcomeMessageMarkup_en.welcome;
          const welcomeMessageMarkup = { inline_keyboard: welcomeMessage };
          await this.bot.sendMessage(
            chat_id,
            `Alright, please choose what we will do 👇`,
            { reply_markup: welcomeMessageMarkup },
          );
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  searchFlightLayout = async (chatId, language) => {
    try {
      switch (language) {
        case 'english':
          const searchFlight = searchType.searchTypeMarkup;

          const selectFlightMarkup = {
            inline_keyboard: searchFlight,
          };
          return await this.bot.sendMessage(
            chatId,
            `Please select the type of search 👇`,
            { reply_markup: selectFlightMarkup },
          );
      }
    } catch (error) {
      console.log(error);
    }
  };

  sendPremiumDealLayout = async (chatId, language) => {
    try {
      switch (language) {
        case 'english':
          const premiumDeals = premiumDeal.premiumDealMarkup;

          const premiumMarkup = {
            inline_keyboard: premiumDeals,
          };
          return await this.bot.sendMessage(
            chatId,
            `Upgrade to Flight-booking Premium and enjoy access to all the benefits at an incredibly affordable price.\n\nToday Only: 90% OFF! $120 $12/year\n\n🛩 Choose a specific flight to track.\n\n⚡️ Enjoy more frequent updates on ticket prices.\n\n🤘 Be the first to receive flight alerts.\n\n🎫 Use the Flight Deals feature to find flights across a wide range of dates and track prices for all flights at once.\n\n💬 Receive premium support.\n\n💸 Support an independent business that respects your data privacy.\n\n💳 30-day money-back guarantee if you're not satisfied.`,
            { reply_markup: premiumMarkup },
          );
      }
    } catch (error) {
      console.log(error);
    }
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
