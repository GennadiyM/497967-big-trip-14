import dayjs from 'dayjs';
import {createElement} from '../utils.js';

const Class = {
  BTN_FAVORITE_ACTIVE: 'event__favorite-btn--active',
};

const createPointTemplate = (point) => {
  const {type, destination, dateFrom, dateTo, basePrice, offers, isFavorite} = point;

  const favoriteClassName = isFavorite ? Class.BTN_FAVORITE_ACTIVE : '';

  const getSeconds = (millisec) => {
    return (millisec / 1000).toFixed(0);
  };

  const getTimeElementString = (timeElement, typeElement) => {
    return timeElement >= 10 ? `${timeElement}${typeElement}` : `0${timeElement}${typeElement}`;
  };

  const getDurationPoint = () => {
    const start = dayjs(dateFrom);
    const end = dayjs(dateTo);
    const millisec = end.diff(start);
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

  const getOffersList = () => {
    const offersList = offers.map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');

    return offers.length > 0 ? `<ul class="event__selected-offers">${offersList}</ul>` : '';
  };

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="${type.toLowerCase()}">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateFrom).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateTo).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${getDurationPoint()}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>

      ${getOffersList()}

      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
