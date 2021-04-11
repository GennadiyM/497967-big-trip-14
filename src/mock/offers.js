import {TYPE_NAMES, OFFER_NAMES} from '../constants.js';
import {getRandomInteger, getRandomElementArray} from '../utils.js';

const PriceOffer = {
  MIN: 50,
  MAX: 150,
};

const CountOffer = {
  MIN: 0,
  MAX: 5,
};

const generateOffer = function(title) {
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

export const generateOffers = function () {
  return TYPE_NAMES.map((typeName) => {
    return generateOffersListInType(typeName);
  });
};

