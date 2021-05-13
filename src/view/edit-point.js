import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {TYPE_NAMES, DESTINATION_NAMES, Selector} from '../constants.js';
import {validityDistinationName, getRequiredValues} from '../utils/point.js';
import SmartView from './smart.js';

const createEditPointTemplate = (point, destinationsList, offersList) => {
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
    if (!validityDistinationName(currentDestination, destinationsList)) {
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
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
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
  id: nanoid(),
  isFavorite: false,
};

export default class EditPoint extends SmartView {
  constructor(destinationsList, offersList, point = examplePoint) {
    super();
    this._data = EditPoint.parsePointToData(point);
    this._destinations = destinationsList;
    this._offers = offersList;
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEditPointTemplate(this._data, this._destinations, this._offers);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(Selector.FORM_TOGGLE).addEventListener('click', this._closeClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(Selector.FORM).addEventListener('submit', this._formSubmitHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseClickHandler(this._callback.closeClick);
  }

  reset(point) {
    this.updateData(
      EditPoint.parsePointToData(point),
    );
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

    this.updateData({
      currentType: evt.target.value,
      currentOffers: [],
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();

    this.updateData({
      currentDestination: evt.target.value,
    }, true);

    if (!validityDistinationName(this._data.currentDestination, this._destinations)) {
      evt.target.setCustomValidity('Выберите значение из списка');
    } else {
      evt.target.setCustomValidity('');
    }
  }

  _priceInputHandler(evt) {
    evt.preventDefault();

    this.updateData({
      currentPrice: evt.target.value,
    }, true);

    if (!this._data.currentPrice) {
      evt.target.setCustomValidity('Заполните поле');
    } else if (this._data.currentPrice < 0) {
      evt.target.setCustomValidity('Число не может быть меньше 0');
    } else {
      evt.target.setCustomValidity('');
    }
  }

  _getClickOffer(clickOfferName) {
    for (const offer of getRequiredValues('type', this._offers, 'offers', this._data.currentType)) {
      if (offer.title === clickOfferName) {
        return offer;
      }
    }
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

  _setInnerHandlers() {
    this.getElement().querySelector(Selector.TYPE_LIST).addEventListener('change', this._typeChangeHandler);
    this.getElement().querySelector(Selector.DESTINATION).addEventListener('input', this._destinationChangeHandler);
    this.getElement().querySelector(Selector.PRICE).addEventListener('input', this._priceInputHandler);

    if (getRequiredValues('type', this._offers, 'offers', this._data.currentType).length !== 0) {
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
