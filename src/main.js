import {Selector} from './constants.js';
import TripInfoView from './view/trip-info.js';
import TripRouteView from './view/trip-route.js';
import TripCostView from './view/trip-cost.js';
import AddBtnView from './view/add-btn.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import TravelPresenter from './presenter/travel.js';
import {render, RenderPosition} from './utils/render.js';
import {generatePoints} from './mock/points.js';
import {generateDestinations} from './mock/destinations.js';
import {generateOffers} from './mock/offers.js';

const POINT_COUNT = 33;

const destinations = generateDestinations();
const offers = generateOffers();
const points = generatePoints(offers).slice(0, POINT_COUNT);

const tripMainContainer = document.querySelector(Selector.MAIN);
const tripMenuContainer = tripMainContainer.querySelector(Selector.MENU);
const tripFilterContainer = tripMainContainer.querySelector(Selector.FILTER);
const tripContentContainer = document.querySelector(Selector.CONTENT);

const tripInfoComponent = new TripInfoView();

render(tripMainContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new TripRouteView());
render(tripInfoComponent, new TripCostView());

render(tripMainContainer, new AddBtnView());
render(tripMenuContainer, new MenuView());
render(tripFilterContainer, new FilterView());

const travelPresenter = new TravelPresenter(tripContentContainer, destinations, offers);
travelPresenter.init(points);
