export const SortType = {
  DEFAULT: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-offer',
};

export const Selector = {
  MAIN: '.trip-main',
  MENU: '.trip-controls__navigation',
  FILTER: '.trip-controls__filters',
  PAGE: 'body',
  PAGE_BODY_CONTAINER: '.page-main .page-body__container',
  TRIP_EVENTS: '.trip-events',
  STATISTICS: '.statistics',
  STATISTICS_MONEY: '.statistics__chart--money',
  STATISTICS_TYPE: '.statistics__chart--transport',
  STATISTICS_TIME: '.statistics__chart--time',
  CONTENT: '.trip-events',
  FORM_TOGGLE: '.event__rollup-btn',
  FORM: '.event',
  FAVORITE: '.event__favorite-btn',
  TYPE_LIST: '.event__type-list',
  DESTINATION: '.event__input--destination',
  PRICE: '.event__input--price',
  OFFERS: '.event__available-offers',
  DATE_FROM: '.event__input--time[name="event-start-time"]',
  DATE_TO: '.event__input--time[name="event-end-time"]',
  RESET_BTN: '.event__reset-btn',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
  DISABLED: 'disabled',
};

export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINTS',
  POINTS: 'POINTS',
  STATISTICS: 'STATISTICS',
};

export const ChartType = {
  MONEY: 'money',
  TYPE: 'type',
  TIME: 'time',
};

export const ChartSetting = {
  TYPE: 'horizontalBar',
  COLOR: {
    WHITE: '#ffffff',
    BLACK: '#000000',
  },
  ANCHOR: {
    START: 'start',
    END: 'end',
  },
  ALIGN: 'start',
  TEXT: {
    MONEY: 'MONEY',
    TYPE: 'TYPE',
    TIME_SPEND: 'TIME SPEND',
  },
  TITLE_POSITION: 'left',
  TICKS_PADDING: 5,
  DATA_FONT_SIZE: 13,
  TITLE_FONT_SIZE: 23,
  TICKS_FONT_SIZE: 13,
  BAR_THICKNESS: 44,
  MIN_BAR_LENGTH: 100,
  BAR_HEIGHT: 55,
};
