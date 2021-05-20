import dayjs from 'dayjs';

export const sortPointsPrice = (eventA, eventB) => {
  return eventB.basePrice - eventA.basePrice;
};

export const sortPointDate = (eventA, eventB) => {
  const startEventA = dayjs(eventA.dateFrom);
  const startEventB = dayjs(eventB.dateFrom);

  return startEventA - startEventB;
};

export const sortPointsTime = (eventA, eventB) => {
  const startEventA = dayjs(eventA.dateFrom);
  const endEventA = dayjs(eventA.dateTo);
  const durationEventA = endEventA.diff(startEventA);
  const startEventB = dayjs(eventB.dateFrom);
  const endEventB = dayjs(eventB.dateTo);
  const durationEventB = endEventB.diff(startEventB);

  return durationEventB - durationEventA;
};

export const validateDistinationName = (name, destinations) => {
  const destinationNames = destinations.map((item) => item.name);

  return destinationNames.includes(name);
};

export const getRequiredValues = (requiredKey, arrayToSearch, requiredDataName, example) => {
  const requiredValues = arrayToSearch.find((item) => item[requiredKey] === example)[requiredDataName].slice();
  return requiredValues;
};

const getSeconds = (millisec) => {
  return (millisec / 1000).toFixed(0);
};

const getTimeElementString = (timeElement, typeElement) => {
  return timeElement >= 10 ? `${timeElement}${typeElement}` : `0${timeElement}${typeElement}`;
};

export const getTimeString = (millisec) => {
  const seconds = getSeconds(millisec);
  const days = Math.floor(seconds / 60 / 60 / 24);
  const secondsRestDay = getSeconds(millisec - days * 24 * 60 * 60 * 1000);
  const hours = Math.floor(secondsRestDay / 60 / 60);
  const secondsRestHours = getSeconds(secondsRestDay * 1000 - hours * 60 * 60 * 1000);
  const minutes = Math.floor(secondsRestHours / 60);
  let totalTime = getTimeElementString(minutes, 'M');

  if (days > 0) {
    totalTime = `${getTimeElementString(days, 'D')} ${getTimeElementString(hours, 'H')} ${getTimeElementString(minutes, 'M')}`;
  }

  if (days === 0 && hours > 0) {
    totalTime = `${getTimeElementString(hours, 'H')} ${getTimeElementString(minutes, 'M')}`;
  }

  return totalTime;
};
