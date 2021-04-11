export const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDecimalInteger = (num) => Math.round(num / 10) * 10;

export const getRandomElementArray = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};
