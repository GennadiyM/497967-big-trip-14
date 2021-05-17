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
    this.getElement().addEventListener('click', this._btnClickHandler);
  }

  _btnClickHandler(evt) {
    evt.preventDefault();
    this.getElement().disabled = true;
    this._callback.btnClick();
  }
}
