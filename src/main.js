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
import {render, RenderPosition, replace} from './utils/render.js';
import {generatePoints} from './mock/points.js';
import {generateDestinations} from './mock/destinations.js';
import {generateOffers} from './mock/offers.js';
import {Selector} from './selector.js';

const renderPoint = (container, point, destinations, offers) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point, destinations, offers);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const replacePointToForm = () => {
    replace(editPointComponent, pointComponent);
    document.addEventListener('keydown', onEscKeyDown);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, editPointComponent);
  };

  pointComponent.setOpenClickHandler(replacePointToForm);
  editPointComponent.setCloseClickHandler(replaceFormToPoint);
  editPointComponent.setFormSubmitHandler(replaceFormToPoint);

  render(container, pointComponent);
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

render(tripMainContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new TripRouteView());
render(tripInfoComponent, new TripCostView());

render(tripMainContainer, new AddBtnView());
render(tripMenuContainer, new MenuView());
render(tripFilterContainer, new FilterView());
render(tripContentContainer, new SortingView());
render(tripContentContainer, pointListComponent);

points.forEach((point) => renderPoint(pointListComponent, point, destinations, offers));
