import AbstractView from './abstract.js';

const createAddBtnTemplate = () => {
  return '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>';
};

export default class AddBtn extends AbstractView {
  constructor() {
    super();

    this._btnClickHandler = this._btnClickHandler.bind(this);
  }

  getTemplate() {
    return createAddBtnTemplate();
  }

  setAddBtnClickHandler(callback) {
    this._callback.btnClick = callback;
  }

  init() {
    this.getElement().disabled = false;
    this.getElement().addEventListener('click', this._btnClickHandler);
  }

  destroy() {
    this.getElement().addEventListener('click', this._btnClickHandler);
    this.getElement().disabled = true;
  }

  _btnClickHandler(evt) {
    evt.preventDefault();
    this.getElement().disabled = true;
    this._callback.btnClick();
  }
}
