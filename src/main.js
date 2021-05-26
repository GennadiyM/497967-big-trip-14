import {Selector, UpdateType} from './constants.js';
import TripEventsView from './view/trip-events.js';
import StatisticsView from './view/statistics.js';
import FilterPresenter from './presenter/filter.js';
import TravelPresenter from './presenter/travel.js';
import SiteMenuPresenter from './presenter/site-menu.js';
import PointsModel from './model/points.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import FilterModel from './model/filter.js';
import {render} from './utils/render.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic afasdfq452dsgfs4';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const filterModel = new FilterModel();

const pageBody = document.querySelector(Selector.PAGE_BODY_CONTAINER);
const tripMainContainer = document.querySelector(Selector.MAIN);
const tripMenuContainer = tripMainContainer.querySelector(Selector.MENU);

const tripEventsComponent = new TripEventsView();
render(pageBody, tripEventsComponent);

const tripContentContainer = pageBody.querySelector(Selector.CONTENT);
const tripFilterContainer = tripMainContainer.querySelector(Selector.FILTER);

const statisticsComponent = new StatisticsView(pointsModel);
const travelPresenter = new TravelPresenter(tripContentContainer, pointsModel, offersModel, destinationsModel, filterModel, tripEventsComponent, api);
const siteMenuPresenter = new SiteMenuPresenter(tripMenuContainer, tripMainContainer, travelPresenter, filterModel, statisticsComponent, pointsModel);
const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);

siteMenuPresenter.init();

Promise.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffers(),
]).then(([points, destinations, offers]) => {
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);
  pointsModel.setPoints(UpdateType.INIT, points);
}).catch(() => {
  pointsModel.setPoints(UpdateType.ERROR, []);
});

filterPresenter.init();
travelPresenter.init();
render(pageBody, statisticsComponent);
