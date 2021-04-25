import SortingView from '../view/sorting.js';
import EmptyListView from '../view/empty-list.js';
import PointListView from '../view/point-list.js';
import PointPresenter from './point.js';
import {render} from '../utils/render.js';
import {updateItem} from '../utils/common.js';

export default class Travel {
  constructor(travelContainer, destinations, offers) {
    this._travelContainer = travelContainer;
    this._destinations = destinations.slice();
    this._offers = offers.slice();
    this._pointPresenter = {};

    this._sortingComponent = new SortingView();
    this._emptyListComponent = new EmptyListView();
    this._pointListComponent = new PointListView();
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();

    this._renderTravel();
  }

  _renderEmptyList() {
    render(this._travelContainer, this._emptyListComponent);
  }

  _renderSorting() {
    render(this._travelContainer, this._sortingComponent);
  }

  _renderPointList() {
    render(this._travelContainer, this._pointListComponent);
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._destinations, this._offers, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPoinList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderTravel() {
    if (this._points.length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderSorting();
    this._renderPointList();
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
