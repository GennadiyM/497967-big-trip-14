import {createElement} from '../utils.js';

const createAddBtnTemplate = () => {
  return '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>';
};

export default class AddBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createAddBtnTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
