import EditPointView from '../view/edit-point.js';
import {nanoid} from 'nanoid';
import {render, remove, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../constants.js';

export default class NewPoint {
  constructor(pointListContainer, offersModel, destinationsModel, changeData) {
    this._pointListContainer = pointListContainer;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._changeData = changeData;

    this._editPointComponent = null;

    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._editPointComponent !== null) {
      return;
    }

    this._editPointComponent = new EditPointView(this._offersModel.getOffers(), this._destinationsModel.getDestinations());
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editPointComponent.setCancelClickHandler(this._handleCancelClick);

    render(this._pointListContainer, this._editPointComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._editPointComponent == null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._editPointComponent);
    this._editPointComponent = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleCancelClick() {
    this.destroy();
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
      point.id = nanoid(),
    );
    this.destroy();
  }
}
