import dayjs from "dayjs";
import {FilterType} from "../constants.js"

const checkDatePoint = (point) => {
  if (point.dateFrom.getTime() < Date.now() && point.dateTo.getTime() > Date.now()) {
    return true;
  }
};

export const isPointFuture = (point)  => {

  if (checkDatePoint(point)) {
    return true;
  }
  return point.dateFrom.getTime() > Date.now();
};

export const isPointPast = (point)  => {
  if (checkDatePoint(point)) {
    return true;
  }
  return point.dateFrom.getTime() < Date.now();
};

export const Filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isPointFuture),
  [FilterType.PAST]: (points) => points.filter(isPointPast),
};
