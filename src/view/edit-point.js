import dayjs from 'dayjs';
import {TYPE_NAMES, DESTINATION_NAMES} from '../constants.js';

export const createEditPointTemplate = (point, destinationsList, offersList) => {
  const {type, destination, dateFrom, dateTo, basePrice, offers, id} = point;

  const getRequiredValues = (requiredKey, arrayToSearch, requiredDataName, example) => {
    let requiredValues = false;

    for(const item of arrayToSearch) {
      if (item[requiredKey] === example) {
        requiredValues = item[requiredDataName].slice();
        break;
      }
    }

    return requiredValues;
  };

  const getTypePointControls = () => {
    return TYPE_NAMES.map((name)=> {
      return `<div class="event__type-item">
        <input id="event-type-${name}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${name}" ${name == type ? 'checked' : ''}>
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

    return actualOffersList.map((offer) => {
      const offerName = offer.title.split(' ').pop();

      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-${id}" type="checkbox" name="event-offer-${offerName}-${id}" ${offers.indexOf(offer) !== -1 ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offerName}-${id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
    }).join('');
  };

  const getOffers = () => {
    if (actualOffersList.length === 0) {
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

  const actualOffersList = getRequiredValues('type', offersList, 'offers', type);
  const actualDestinationDescription = getRequiredValues('name', destinationsList, 'description', destination);
  const actualDestinationPictures = getRequiredValues('name', destinationsList, 'pictures', destination);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type}">
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
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            ${getDestinationsNames()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
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
