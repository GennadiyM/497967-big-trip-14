import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {TYPE_NAMES, DESTINATION_NAMES} from '../constants.js';
import {getRandomInteger, getDecimalInteger, getRandomElementArray} from '../utils/common.js';

const MAX_COUNT_OFFER_CHECKED = 2;

const PricePoint = {
  MIN: 0,
  MAX: 1000,
};

const generateDates = () => {
  const MAX_DAYS_GAP = 7;
  const MAX_HOURS_GAP = 23;
  const MAX_MINUTES_GAP = 59;

  const daysGap = () => getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const futureDaysGap = () => getRandomInteger(0, MAX_DAYS_GAP);
  const hoursGap = () => getRandomInteger(0, MAX_HOURS_GAP);
  const minutesGap = () => getDecimalInteger(getRandomInteger(0, MAX_MINUTES_GAP));

  const dateFrom = dayjs().set('minute', 0).set('second', 0).set('millisecond', 0).add(daysGap(), 'day').add(hoursGap(), 'hour').add(minutesGap(), 'minute').toDate();
  const dateTo = dayjs(dateFrom).add(futureDaysGap(), 'day').add(hoursGap(), 'hour').add(minutesGap(), 'minute').toDate();

  return {
    dateFrom,
    dateTo,
  };
};

const getOffers = (offers, type) => {
  let offersList = [];
  for (const item of offers) {
    if (item.type === type) {
      offersList = item.offers.slice(getRandomInteger(0, MAX_COUNT_OFFER_CHECKED));
      break;
    }
  }
  return offersList;
};

const generatePoint = (offersList, destination) => {
  const type = getRandomElementArray(TYPE_NAMES);

  return {
    'basePrice': getRandomInteger(PricePoint.MIN, PricePoint.MAX),
    'dateFrom': generateDates().dateFrom,
    'dateTo': generateDates().dateTo,
    destination,
    'id': nanoid(),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': getOffers(offersList, type),
    type,
  };
};

export const generatePoints = (offersList) => {
  return DESTINATION_NAMES.map((pointName) => {
    return generatePoint(offersList, pointName);
  });
};
