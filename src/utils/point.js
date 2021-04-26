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
