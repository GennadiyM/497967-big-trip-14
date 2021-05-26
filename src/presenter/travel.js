import SortingView from '../view/sorting.js';
import EmptyListView from '../view/empty-list.js';
import PointListView from '../view/point-list.js';
import LoadingView from '../view/loading.js';
import LoadingErrorView from '../view/loading-error.js';
import PointPresenter, {State as PointPresenterViewState}  from './point.js';
import NewPointPresenter from './new-point.js';
import {render, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {sortPointsPrice, sortPointsTime, sortPointDate} from '../utils/point.js';
import {SortType, UpdateType, UserAction} from '../constants.js';

export default class Travel {
  constructor(travelContainer, pointsModel, offersModel, destinationsModel, filterModel, tripEventsComponent, api) {
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._filterModel = filterModel;
    this._travelContainer = travelContainer;
    this._tripEventsComponent = tripEventsComponent;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._isLoadingError = false;
    this._api = api;

    this._sortingComponent = new SortingView(this._currentSortType);
    this._emptyListComponent = new EmptyListView();
    this._loadingComponent = new LoadingView();
    this._loadingErrorComponent = new LoadingErrorView();
    this._pointListComponent = new PointListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newPointPresenter = new NewPointPresenter(this._pointListComponent, this._offersModel, this._destinationsModel, this._handleViewAction);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._tripEventsComponent.show();
    this._renderTravel();
  }

  destroy() {
    this._clearTravel(true);
    this._tripEventsComponent.hide();

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  replacePontListOnEmptyList() {
    if (this._getPoints().length === 0) {
      remove(this._pointListComponent);
      render(this._travelContainer, this._emptyListComponent);
    }
  }

  createPoint(callback) {
    if (this._getPoints().length === 0) {
      remove(this._emptyListComponent);
      render(this._travelContainer, this._pointListComponent);
    }

    this._siteMenuPresenter.reset();
    this._newPointPresenter.init(callback);
  }

  setSiteMenuPresenter(presenter) {
    this._siteMenuPresenter = presenter;
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredPoints.sort(sortPointsTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPointsPrice);
    }
    return filtredPoints.sort(sortPointDate);
  }

  _renderEmptyList() {
    render(this._travelContainer, this._emptyListComponent);
  }

  _renderLoading() {
    render(this._travelContainer, this._loadingComponent);
  }

  _renderLoadingError() {
    render(this._travelContainer, this._loadingErrorComponent);
  }

  _renderSorting() {
    render(this._travelContainer, this._sortingComponent);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPointList() {
    render(this._travelContainer, this._pointListComponent);
    this._getPoints().forEach((point) => this._renderPoint(point));
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._offersModel, this._destinationsModel, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPoinList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    remove(this._pointListComponent);
    this._pointPresenter = {};
  }

  _clearTravel(resetSortType = false) {
    remove(this._sortingComponent);
    remove(this._emptyListComponent);

    this._clearPoinList();

    this._newPointPresenter.destroy();

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
      this._sortingComponent.setCurrentSortType(this._currentSortType);
    }
  }

  _renderTravel() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._isLoadingError) {
      this._renderLoadingError();
      return;
    }

    if (this._getPoints().length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderSorting();
    this._renderPointList();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._newPointPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._newPointPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTravel();
        this._renderTravel();
        break;
      case UpdateType.MAJOR:
        this._clearTravel(true);
        this._renderTravel();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTravel();
        break;
      case UpdateType.ERROR:
        this._isLoading = false;
        this._isLoadingError = true;
        remove(this._loadingComponent);
        this._renderTravel();
    }
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTravel();
    this._renderTravel();
  }
}
