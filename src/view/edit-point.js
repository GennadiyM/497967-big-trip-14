import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import {TYPE_NAMES, DESTINATION_NAMES, Selector} from '../constants.js';
import {validateDistinationName, getRequiredValues} from '../utils/point.js';
import SmartView from './smart.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEditPointTemplate = (point, destinationsList, offersList, editMode) => {
  const {currentType, currentDestination, currentDateFrom, currentDateTo, currentPrice, currentOffers, id} = point;

  const actualDestinationDescription = getRequiredValues('name', destinationsList, 'description', currentDestination);
  const actualDestinationPictures = getRequiredValues('name', destinationsList, 'pictures', currentDestination);
  const actualOffers = getRequiredValues('type', offersList, 'offers', currentType);

  const getTypePointControls = () => {
    return TYPE_NAMES.map((name)=> {
      return `<div class="event__type-item">
        <input id="event-type-${name}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${name == currentType ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${name}" for="event-type-${name}-${id}">${name}</label>
      </div>`;
    }).join('');
  };

  const getDestinationsNames = () => {
    return DESTINATION_NAMES.map((name)=> {
      return `<option value="${name}"></option>`;
    }).join('');
  };

  const getOffersControls = () => {
    return actualOffers.map((offer) => {
      const offerName = offer.title.split(' ').pop();

      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-${id}" data-title="${offer.title}" type="checkbox" name="event-offer-${offerName}-${id}" ${currentOffers.includes(offer) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offerName}-${id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
    }).join('');
  };

  const getOffers = () => {
    if (actualOffers.length === 0) {
      return '';
    }

    return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${getOffersControls()}
      </div>
    </section>`;
  };

  const getDestination = () => {
    if (!validateDistinationName(currentDestination, destinationsList)) {
      return '';
    }

    const htmlDescription = actualDestinationDescription !== '' ? `
      <p class="event__destination-description">${actualDestinationDescription}</p>
    ` : '';

    const htmlImages = actualDestinationPictures.length === 0 ? '' : `<div class="event__photos-container">
        <div class="event__photos-tape">
            ${actualDestinationPictures.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).join('')}
        </div>
    </div>`;

    return actualDestinationDescription === '' && actualDestinationPictures.lenght === 0 ? '' : `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${htmlDescription}
      ${htmlImages}
    </section>`;
  };

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${currentType}.png" alt="${currentType}">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${getTypePointControls()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${currentType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${currentDestination}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            ${getDestinationsNames()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dayjs(currentDateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dayjs(currentDateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="number" min="0" name="event-price" value="${currentPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${editMode ? 'Delete' : 'Cancel'}</button>
        ${editMode ? '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>' : ''}
      </header>
      <section class="event__details">
        ${getOffers()}
        ${getDestination()}
      </section>
    </form>
  </li>`;
};

const examplePoint = {
  type: TYPE_NAMES[0],
  destination: DESTINATION_NAMES[0],
  dateFrom: dayjs().set('minute', 0).set('second', 0).set('millisecond', 0).toDate(),
  dateTo: dayjs().set('minute', 0).set('second', 0).set('millisecond', 0).toDate(),
  basePrice: 0,
  offers: [],
  id: 'new',
  isFavorite: false,
};

export default class EditPoint extends SmartView {
  constructor(offersList, destinationsList, point = examplePoint, editMode = false) {
    super();
    this._data = EditPoint.parsePointToData(point);
    this._editMode = editMode;
    this._datepickerDateFrom = null;
    this._datepickerDateTo = null;
    this._offers = offersList.slice();
    this._destinations = destinationsList.slice();
    this._offersOnActualType = getRequiredValues('type', this._offers, 'offers', this._data.currentType);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  removeElement() {
    super.removeElement();

    this._destroyDatepickers();
  }

  reset(point) {
    this.updateData(
      EditPoint.parsePointToData(point),
    );
  }

  getTemplate() {
    return createEditPointTemplate(this._data, this._destinations, this._offers, this._editMode);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(Selector.FORM_TOGGLE).addEventListener('click', this._closeClickHandler);
  }

  setCancelClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(Selector.DEL).addEventListener('click', this._closeClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(Selector.FORM).addEventListener('submit', this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(Selector.DEL).addEventListener('click', this._formDeleteClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepickers() {
    this._destroyDatepickers();

    this._datepickerDateFrom = flatpickr(
      this.getElement().querySelector(Selector.DATE_FROM),
      {
        enableTime: true,
        minTime: dayjs(this._data.currentDateFrom).format('HH:mm'),
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.currentDateFrom,
        onChange: this._dateFromChangeHandler,
        maxDate: this._data.currentDateTo,
      },
    );

    this._datepickerDateTo = flatpickr(
      this.getElement().querySelector(Selector.DATE_TO),
      {
        enableTime: true,
        minTime: dayjs(this._data.currentDateFrom).format('HH:mm'),
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.currentDateTo,
        onChange: this._dateToChangeHandler,
        minDate: this._data.currentDateFrom,
      },
    );
  }

  _destroyDatepickers() {
    if (this._datepickerDateFrom) {
      this._datepickerDateFrom.destroy();
      this._datepickerDateFrom = null;
    }

    if (this._datepickerDateTo) {
      this._datepickerDateTo.destroy();
      this._datepickerDateTo = null;
    }
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    this._callback.formSubmit(EditPoint.parseDataToPoint(this._data));
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();

    this._offersOnActualType = getRequiredValues('type', this._offers, 'offers', evt.target.value);

    this.updateData({
      currentType: evt.target.value,
      currentOffers: [],
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();

    if (!validateDistinationName(evt.target.value, this._destinations)) {
      evt.target.setCustomValidity('Выберите значение из списка');
    } else {
      evt.target.setCustomValidity('');

      this.updateData({
        currentDestination: evt.target.value,
      });
    }
  }

  _priceInputHandler(evt) {
    evt.preventDefault();

    if (!evt.target.value) {
      evt.target.setCustomValidity('Заполните поле');
    } else if (evt.target.value < 0) {
      evt.target.setCustomValidity('Число не может быть меньше 0');
    } else {
      evt.target.setCustomValidity('');

      this.updateData({
        currentPrice: evt.target.value,
      }, true);
    }
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      currentDateTo: userDate,
    }, true);
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      currentDateFrom: userDate,
    }, true);
  }

  _getClickOffer(clickOfferName) {
    return this._offersOnActualType.find((offer) => offer.title === clickOfferName);
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    const clickOfferName = evt.target.dataset.title;

    const clickOffer = this._getClickOffer(clickOfferName);

    if (this._data.currentOffers.includes(clickOffer)) {
      delete this._data.currentOffers[this._data.currentOffers.indexOf(clickOffer)];
    } else {
      this._data.currentOffers.push(clickOffer);
    }

    this.updateData({
      currentOffers: this._data.currentOffers,
    }, true);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditPoint.parseDataToPoint(this._data));
  }

  _setInnerHandlers() {
    this.getElement().querySelector(Selector.TYPE_LIST).addEventListener('change', this._typeChangeHandler);
    this.getElement().querySelector(Selector.DESTINATION).addEventListener('change', this._destinationChangeHandler);
    this.getElement().querySelector(Selector.PRICE).addEventListener('input', this._priceInputHandler);

    if (this._offersOnActualType.length !== 0) {
      this.getElement().querySelector(Selector.OFFERS).addEventListener('change', this._offersChangeHandler);
    }
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        currentDateFrom: point.dateFrom,
        currentDateTo: point.dateTo,
        currentPrice: point.basePrice,
        currentType: point.type,
        currentDestination: point.destination,
        currentOffers: point.offers.slice(),
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    data.dateFrom = data.currentDateFrom;
    data.dateTo = data.currentDateTo;
    data.type = data.currentType;
    data.destination = data.currentDestination;
    data.basePrice = data.currentPrice;
    data.offers = data.currentOffers.slice();

    delete data.currentDateFrom;
    delete data.currentDateTo;
    delete data.currentPrice;
    delete data.currentType;
    delete data.currentDestination;
    delete data.currentOffers;

    return data;
  }
}
