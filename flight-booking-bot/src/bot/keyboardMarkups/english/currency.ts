// import translate from 'google-translate-api';
// english
export const currencies_en = {
  firstDisplay: [
    [
      {
        text: '🇪🇺 EUR',
        callback_data: JSON.stringify({
          command: '/currencySelected',
          currency: 'EUR_english',
        }),
      },
      { text: '🇺🇸 USA', callback_data: '/austria' },
      { text: 'Bangladesh', callback_data: '/bangladesh' },
    ],
    [
      { text: 'Brazil', callback_data: '/brazil' },
      { text: 'Canada', callback_data: '/canada' },
      { text: 'Czech Republic', callback_data: '/czech_republic' },
    ],
    [
      { text: 'Denmark', callback_data: '/denmark' },
      { text: 'France', callback_data: '/france' },
      { text: 'Germany', callback_data: '/germany' },
    ],
    [
      { text: 'Ghana', callback_data: '/ghana' },
      { text: 'India', callback_data: '/india' },
      { text: 'Indonesia', callback_data: '/indonesia' },
    ],
    [
      { text: 'Iran', callback_data: '/iran' },
      { text: 'Italy', callback_data: '/italy' },
      { text: 'Malaysia', callback_data: '/malaysia' },
    ],
    [
      { text: 'Netherlands', callback_data: '/netherlands' },
      { text: 'Nigeria', callback_data: '/nigeria' },
      { text: 'Pakistan', callback_data: '/pakistan' },
    ],
    [
      { text: 'Poland', callback_data: '/poland' },
      { text: 'Portugal', callback_data: '/portugal' },
      { text: 'Spain', callback_data: '/spain' },
    ],
    [
      { text: 'Turkey', callback_data: '/turkey' },
      { text: 'Ukraine', callback_data: '/ukraine' },
      { text: 'United Arab Emirate', callback_data: '/uae' },
    ],
    [
      { text: 'United Kingdom', callback_data: '/uk' },
      { text: 'United States', callback_data: '/us' },
      {
        text: '>',
        callback_data: JSON.stringify({
          command: '/nextCurrencyPage',
          action: 'secondDisplay',
        }),
      },
    ],
  ],
  secondDisplay: [
    [
      { text: 'ego', callback_data: '/australia' },
      { text: 'Austria', callback_data: '/austria' },
      { text: 'Bangladesh', callback_data: '/bangladesh' },
    ],
    [
      { text: 'Brazil', callback_data: '/brazil' },
      { text: 'Canada', callback_data: '/canada' },
      { text: 'Czech Republic', callback_data: '/czech_republic' },
    ],
    [
      { text: 'Denmark', callback_data: '/denmark' },
      { text: 'France', callback_data: '/france' },
      { text: 'Germany', callback_data: '/germany' },
    ],
    [
      { text: 'Ghana', callback_data: '/ghana' },
      { text: 'India', callback_data: '/india' },
      { text: 'Indonesia', callback_data: '/indonesia' },
    ],
    [
      { text: 'Iran', callback_data: '/iran' },
      { text: 'Italy', callback_data: '/italy' },
      { text: 'Malaysia', callback_data: '/malaysia' },
    ],
    [
      { text: 'Netherlands', callback_data: '/netherlands' },
      { text: 'Nigeria', callback_data: '/nigeria' },
      { text: 'Pakistan', callback_data: '/pakistan' },
    ],
    [
      { text: 'Poland', callback_data: '/poland' },
      { text: 'Portugal', callback_data: '/portugal' },
      { text: 'Spain', callback_data: '/spain' },
    ],
    [
      { text: 'Turkey', callback_data: '/turkey' },
      { text: 'Ukraine', callback_data: '/ukraine' },
      { text: 'United Arab Emirate', callback_data: '/uae' },
    ],
    [
      {
        text: '<',
        callback_data: JSON.stringify({
          command: '/prevCurrencyPage',
          action: 'firstDisplay',
        }),
      },
      { text: 'United States', callback_data: '/us' },
      {
        text: '>',
        callback_data: JSON.stringify({
          command: '/nextCurrencyPage',
          action: 'thirdDisplay',
        }),
      },
    ],
  ],
  thirdDisplay: [
    [
      { text: 'ugo', callback_data: '/australia' },
      { text: 'Austria', callback_data: '/austria' },
      { text: 'Bangladesh', callback_data: '/bangladesh' },
    ],
    [
      { text: 'Brazil', callback_data: '/brazil' },
      { text: 'Canada', callback_data: '/canada' },
      { text: 'Czech Republic', callback_data: '/czech_republic' },
    ],
    [
      { text: 'Denmark', callback_data: '/denmark' },
      { text: 'France', callback_data: '/france' },
      { text: 'Germany', callback_data: '/germany' },
    ],
    [
      { text: 'Ghana', callback_data: '/ghana' },
      { text: 'India', callback_data: '/india' },
      { text: 'Indonesia', callback_data: '/indonesia' },
    ],
    [
      { text: 'Iran', callback_data: '/iran' },
      { text: 'Italy', callback_data: '/italy' },
      { text: 'Malaysia', callback_data: '/malaysia' },
    ],
    [
      { text: 'Netherlands', callback_data: '/netherlands' },
      { text: 'Nigeria', callback_data: '/nigeria' },
      { text: 'Pakistan', callback_data: '/pakistan' },
    ],
    [
      { text: 'Poland', callback_data: '/poland' },
      { text: 'Portugal', callback_data: '/portugal' },
      { text: 'Spain', callback_data: '/spain' },
    ],
    [
      { text: 'Turkey', callback_data: '/turkey' },
      { text: 'Ukraine', callback_data: '/ukraine' },
      { text: 'United Arab Emirate', callback_data: '/uae' },
    ],
    [
      {
        text: '<',
        callback_data: JSON.stringify({
          command: '/prevCurrencyPage',
          action: 'firstDisplay',
        }),
      },
      { text: 'United States', callback_data: '/us' },
      {
        text: '>',
        callback_data: JSON.stringify({
          command: '/nextCurrencyPage',
          action: 'thirdDisplay',
        }),
      },
    ],
  ],
};
