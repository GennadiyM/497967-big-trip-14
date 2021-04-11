import {POINT_COUNT} from './constants.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripRouteTemplate} from './view/trip-route.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createAddBtnTemplate} from './view/add-btn.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortingTemplate} from './view/sorting.js';
import {createPointListTemplate} from './view/point-list.js';
import {createEditPointTemplate} from './view/edit-point.js';
import {createPointTemplate} from './view/point.js';
import {render} from './utils.js';
import {generatePoints} from './mock/points.js';
import {generateDestinations} from './mock/destinations.js';
import {generateOffers} from './mock/offers.js';

const Selector = {
  MAIN: '.trip-main',
  MENU: '.trip-controls__navigation',
  INFO: '.trip-info',
  FILTER: '.trip-controls__filters',
  CONTENT: '.trip-events',
  POINT_LIST: '.trip-events__list',
};

const destinations = generateDestinations();
const offers = generateOffers();
const [editablePoint, ...otherPoints] = generatePoints(offers);

const tripMainContainer = document.querySelector(Selector.MAIN);
const tripMenuContainer = tripMainContainer.querySelector(Selector.MENU);
const tripFilterContainer = tripMainContainer.querySelector(Selector.FILTER);
const tripContentContainer = document.querySelector(Selector.CONTENT);

render(tripMainContainer, createTripInfoTemplate(), 'afterbegin');
const tripInfoContainer = tripMainContainer.querySelector(Selector.INFO);

render(tripInfoContainer, createTripRouteTemplate());
render(tripInfoContainer, createTripCostTemplate());

render(tripMainContainer, createAddBtnTemplate());
render(tripMenuContainer, createMenuTemplate());
render(tripFilterContainer, createFilterTemplate());
render(tripContentContainer, createSortingTemplate());
render(tripContentContainer, createPointListTemplate());
const pointsContainer = tripContentContainer.querySelector(Selector.POINT_LIST);

render(pointsContainer, createEditPointTemplate(editablePoint, destinations, offers));

for (let i = 1; i < POINT_COUNT; i++) {
  render(pointsContainer, createPointTemplate(otherPoints[i]));
}
