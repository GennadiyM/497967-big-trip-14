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
};
