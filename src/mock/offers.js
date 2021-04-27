import {TYPE_NAMES} from '../constants.js';
import {getRandomInteger, getRandomElementArray} from '../utils/common.js';

const OFFER_NAMES = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train', 'Rent a car'];

const PriceOffer = {
  MIN: 50,
  MAX: 150,
};

const CountOffer = {
  MIN: 0,
  MAX: 5,
};

const generateOffer = (title) => {
  return {
    title,
    price: getRandomInteger(PriceOffer.MIN, PriceOffer.MAX),
  };
};

const generateOffersListInType = (type) => {
  const namesOffers = Array.from(new Set(new Array(getRandomInteger(CountOffer.MIN, CountOffer.MAX)).fill().map(() => getRandomElementArray(OFFER_NAMES))));
  return {
    type,
    'offers': namesOffers.map((title) => generateOffer(title)),
  };
};

export const generateOffers = () => {
  return TYPE_NAMES.map((typeName) => {
    return generateOffersListInType(typeName);
  });
};

