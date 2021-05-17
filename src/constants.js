export const TYPE_NAMES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const DESTINATION_NAMES = ['Amsterdam', 'Geneva', 'Valencia', 'Hamburg', 'Dakar', 'Casablanca', 'Madrid', 'Rome', 'Surat', 'Tokyo', 'Phoenix', 'Houston'];

export const SortType = {
  DEFAULT: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-offer',
};

export const Selector = {
  MAIN: '.trip-main',
  MENU: '.trip-controls__navigation',
  FILTER: '.trip-controls__filters',
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
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINTS',
  POINTS: 'POINTS',
  STATISTICS: 'STATISTICS',
};
