import {Selector} from './constants.js';
import TripInfoView from './view/trip-info.js';
import TripRouteView from './view/trip-route.js';
import TripCostView from './view/trip-cost.js';
import TripEventsView from './view/trip-events.js';
import StatisticsView from './view/statistics.js';
import FilterPresenter from './presenter/filter.js';
import TravelPresenter from './presenter/travel.js';
import SiteMenuPresenter from './presenter/site-menu.js';
import PointsModel from './model/points.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import FilterModel from './model/filter.js';
import {render, RenderPosition} from './utils/render.js';
import {generatePoints} from './mock/points.js';
import {generateDestinations} from './mock/destinations.js';
import {generateOffers} from './mock/offers.js';

const POINT_COUNT = 5;

const destinations = generateDestinations();
const offers = generateOffers();
const points = generatePoints(offers).slice(0, POINT_COUNT);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const offersModel = new OffersModel();
offersModel.setOffers(offers);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(destinations);

const filterModel = new FilterModel();

const pageBody = document.querySelector(Selector.PAGE_BODY_CONTAINER);
const tripMainContainer = document.querySelector(Selector.MAIN);
const tripMenuContainer = tripMainContainer.querySelector(Selector.MENU);

const tripEventsComponent = new TripEventsView();
render(pageBody, tripEventsComponent);

const tripContentContainer = pageBody.querySelector(Selector.CONTENT);

const tripFilterContainer = tripMainContainer.querySelector(Selector.FILTER);

const tripInfoComponent = new TripInfoView();
const statisticsComponent = new StatisticsView(pointsModel);

render(tripMainContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new TripRouteView());
render(tripInfoComponent, new TripCostView());

const travelPresenter = new TravelPresenter(tripContentContainer, pointsModel, offersModel, destinationsModel, filterModel, tripEventsComponent);
const siteMenuPresenter = new SiteMenuPresenter(tripMenuContainer, tripMainContainer, travelPresenter, filterModel, statisticsComponent);
siteMenuPresenter.init();

const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);

travelPresenter.init();
filterPresenter.init();
render(pageBody, statisticsComponent);
