import AbstractView from './abstract.js';
import {MenuItem} from '../constants.js';

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-menu="${MenuItem.POINTS}">Table</a>
    <a class="trip-tabs__btn" href="#" data-menu="${MenuItem.STATISTICS}">Stats</a>
  </nav>`;
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'A') {
      return;
    }

    this._callback.menuClick(evt.target.dataset.menu);
  }
}
