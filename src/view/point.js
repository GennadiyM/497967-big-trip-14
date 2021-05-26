import dayjs from 'dayjs';
import AbstractView from './abstract.js';
import {Selector} from '../constants.js';
import {getTimeString} from '../utils/point.js';

const BTN_FAVORITE_ACTIVE_CLASS = 'event__favorite-btn--active';

const createPointTemplate = (point) => {
  const {type, destination, dateFrom, dateTo, basePrice, offers, isFavorite, isDisabled} = point;

  const favoriteClassName = isFavorite ? BTN_FAVORITE_ACTIVE_CLASS : '';

  const getDurationPoint = (dateFrom, dateTo) => {
    const start = dayjs(dateFrom);
    const end = dayjs(dateTo);
    const millisec = end.diff(start);

    return getTimeString(millisec);
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
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateFrom).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateTo).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${getDurationPoint(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>

      ${getOffersList()}

      <button class="event__favorite-btn ${favoriteClassName}" type="button" ${isDisabled ? 'disabled' : ''}>
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._openClickHandler = this._openClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  setOpenClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(Selector.FORM_TOGGLE).addEventListener('click', this._openClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(Selector.FAVORITE).addEventListener('click', this._favoriteClickHandler);
  }

  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
