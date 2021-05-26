import dayjs from 'dayjs';

const MILLISECONDS_PER_SECOND = 1000;
const HOURS_PER_DAY = 24;
const TIME_TRESHOLD = 10;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;

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
  return (millisec / MILLISECONDS_PER_SECOND).toFixed(0);
};

const getTimeElementString = (timeElement, typeElement) => {
  return timeElement >= TIME_TRESHOLD ? `${timeElement}${typeElement}` : `0${timeElement}${typeElement}`;
};

export const getTimeString = (millisec) => {
  const seconds = getSeconds(millisec);
  const days = Math.floor(seconds / SECONDS_PER_MINUTE / MINUTES_PER_HOUR / HOURS_PER_DAY);
  const secondsRestDay = getSeconds(millisec - days * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND);
  const hours = Math.floor(secondsRestDay / SECONDS_PER_MINUTE / MINUTES_PER_HOUR);
  const secondsRestHours = getSeconds(secondsRestDay * MILLISECONDS_PER_SECOND - hours * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * MILLISECONDS_PER_SECOND);
  const minutes = Math.floor(secondsRestHours / MINUTES_PER_HOUR);
  let totalTime = getTimeElementString(minutes, 'M');

  if (days > 0) {
    totalTime = `${getTimeElementString(days, 'D')} ${getTimeElementString(hours, 'H')} ${getTimeElementString(minutes, 'M')}`;
  }

  if (days === 0 && hours > 0) {
    totalTime = `${getTimeElementString(hours, 'H')} ${getTimeElementString(minutes, 'M')}`;
  }

  return totalTime;
};
