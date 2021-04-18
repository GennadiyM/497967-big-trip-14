import {POINT_COUNT} from './constants.js';
import TripInfoView from './view/trip-info.js';
import TripRouteView from './view/trip-route.js';
import TripCostView from './view/trip-cost.js';
import AddBtnView from './view/add-btn.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import PointListView from './view/point-list.js';
import EditPointView from './view/edit-point.js';
import PointView from './view/point.js';
import {RenderPosition, renderElement} from './utils.js';
import {generatePoints} from './mock/points.js';
import {generateDestinations} from './mock/destinations.js';
import {generateOffers} from './mock/offers.js';

const Selector = {
  MAIN: '.trip-main',
  MENU: '.trip-controls__navigation',
  FILTER: '.trip-controls__filters',
  CONTENT: '.trip-events',
  FORM_TOGGLE: '.event__rollup-btn',
  FORM: '.event',
};

const renderPoint = (container, point, destinations, offers) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point, destinations, offers);

  const replacePointToForm = () => {
    container.replaceChild(editPointComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointListComponent.getElement().replaceChild(pointComponent.getElement(), editPointComponent.getElement());
  };

  pointComponent.getElement().querySelector(Selector.FORM_TOGGLE).addEventListener('click', () => {
    replacePointToForm();
  });

  editPointComponent.getElement().querySelector(Selector.FORM_TOGGLE).addEventListener('click', () => {
    replaceFormToPoint();
  });

  editPointComponent.getElement().querySelector(Selector.FORM).addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  renderElement(container, pointComponent.getElement());
};

const destinations = generateDestinations();
const offers = generateOffers();
const points = generatePoints(offers).slice(0, POINT_COUNT);

const tripMainContainer = document.querySelector(Selector.MAIN);
const tripMenuContainer = tripMainContainer.querySelector(Selector.MENU);
const tripFilterContainer = tripMainContainer.querySelector(Selector.FILTER);
const tripContentContainer = document.querySelector(Selector.CONTENT);

const tripInfoComponent = new TripInfoView();
const pointListComponent = new PointListView();

renderElement(tripMainContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripInfoComponent.getElement(), new TripRouteView().getElement());
renderElement(tripInfoComponent.getElement(), new TripCostView().getElement());

renderElement(tripMainContainer, new AddBtnView().getElement());
renderElement(tripMenuContainer, new MenuView().getElement());
renderElement(tripFilterContainer, new FilterView().getElement());
renderElement(tripContentContainer, new SortingView().getElement());
renderElement(tripContentContainer, pointListComponent.getElement());

points.forEach((point) => renderPoint(pointListComponent.getElement(), point, destinations, offers));
