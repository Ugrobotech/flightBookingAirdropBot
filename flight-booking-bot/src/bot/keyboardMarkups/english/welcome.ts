export const welcomeMessageMarkup_en = {
  welcome: [
    [
      {
        text: '🔎 New Search',
        callback_data: JSON.stringify({
          command: '/newSearch',
          language: 'english',
        }),
      },
      {
        text: '🎫 Flight Deals',
        callback_data: JSON.stringify({
          command: '/premiumDeals',
          language: 'english',
        }),
      },
    ],
    [
      { text: '🔔 Flight Alerts', callback_data: '/SetAlerts' },
      {
        text: '🔓 AirTrack Premium',
        callback_data: JSON.stringify({
          command: '/premiumDeals',
          language: 'english',
        }),
      },
    ],
    [
      {
        text: '⚙️ Settings',
        callback_data: JSON.stringify({
          command: '/settings',
          language: 'english',
        }),
      },
      {
        text: '📢 Share',
        language: 'english',
        switch_inline_query:
          'is a bot designed for searching cheap flights 🛩 and tracking the ticket prices.',
      },
    ],
  ],
};
