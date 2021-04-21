import {getRandomInteger} from '../utils/common.js';
import {DESTINATION_NAMES} from '../constants.js';

const DESTINATION_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const CountImages = {
  MIN: 1,
  MAX: 5,
};

const CountDescriptionSentences = {
  MIN: 1,
  MAX: 5,
};

const allDescriptions = DESTINATION_DESCRIPTION.split(/\.\s*/);

const getDesctinationDescription = () => {
  return DESTINATION_DESCRIPTION.split(/\.\s*/).slice(CountDescriptionSentences.MIN, CountDescriptionSentences.MAX).map((item) => item + '.').join(' ');
};

const getPictures = () => {
  return new Array(getRandomInteger(CountImages.MIN, CountImages.MAX)).fill().map(() => {
    return {
      'src': `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`,
      'description': allDescriptions[getRandomInteger(1, allDescriptions.length - 2)],
    };
  });
};

const generateDestination = (name) => {
  return {
    name,
    'description': getDesctinationDescription(),
    'pictures': getPictures(),
  };
};

export const generateDestinations = () => {
  return DESTINATION_NAMES.map((pointName) => {
    return generateDestination(pointName);
  });
};
