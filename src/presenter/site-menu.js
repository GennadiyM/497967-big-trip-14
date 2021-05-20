import {MenuItem, FilterType, UpdateType, Selector} from '../constants.js';
import AddBtnView from '../view/add-btn.js';
import MenuView from '../view/menu.js';
import {render} from '../utils/render.js';

const AFTER_HIDDEN_CLASS = 'page-body--hidden';

export default class SiteMenu {
  constructor(menuContainer, addBtnContainer, travelPresenter, filterModel, statisticsComponent) {
    this._travelPresenter = travelPresenter;
    this._filterModel = filterModel;
    this._menuContainer = menuContainer;
    this._addBtnContainer = addBtnContainer;
    this._statisticsComponent = statisticsComponent;
    this._menuComponent = new MenuView();
    this._addBtnComponent = new AddBtnView();
    this._pageContainer = document.querySelector(Selector.PAGE);

    render(this._addBtnContainer, this._addBtnComponent);
    render(this._menuContainer, this._menuComponent);

    this._handleMenuClick = this._handleMenuClick.bind(this);
    this._handleAddBtnClick = this._handleAddBtnClick.bind(this);
    this._handleNewPointFormClose = this._handleNewPointFormClose.bind(this);
  }

  init() {
    this._menuItemActive = this._menuComponent.getElement().querySelector(`.trip-tabs__btn[data-menu="${MenuItem.POINTS}"]`);
    this._travelPresenter.setSiteMenuPresenter(this);
    this._menuComponent.setMenuClickHandler(this._handleMenuClick);
    this._addBtnComponent.setAddBtnClickHandler(this._handleAddBtnClick);
    this._addBtnComponent.init();
  }

  reset() {
    this._setActiveBtn();
  }

  _setActiveBtn(menuItem = MenuItem.POINTS) {
    this._menuItemActive.classList.remove('trip-tabs__btn--active');
    this._menuItemActive = this._menuComponent.getElement().querySelector(`.trip-tabs__btn[data-menu="${menuItem}"]`);
    this._menuItemActive.classList.add('trip-tabs__btn--active');
  }

  _handleMenuClick(menuItem) {
    this._setActiveBtn(menuItem);

    switch (menuItem) {
      case MenuItem.POINTS:
        this._statisticsComponent.hide();
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this._addBtnComponent.getElement().disabled = false;
        this._travelPresenter.destroy();
        this._travelPresenter.init();
        this._pageContainer.classList.remove(AFTER_HIDDEN_CLASS);
        break;
      case MenuItem.STATISTICS:
        this._travelPresenter.destroy();
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.DISABLED);
        this._addBtnComponent.getElement().disabled = true;
        this._statisticsComponent.show();
        this._pageContainer.classList.add(AFTER_HIDDEN_CLASS);
        break;
    }
  }

  _handleAddBtnClick() {
    this._travelPresenter.destroy();
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._travelPresenter.init();
    this._travelPresenter.createPoint(this._handleNewPointFormClose);
    this._addBtnComponent.getElement().disabled = true;
  }

  _handleNewPointFormClose() {
    this._addBtnComponent.getElement().disabled = false;
    this._travelPresenter.replacePontListOnEmptyList();
  }
}
