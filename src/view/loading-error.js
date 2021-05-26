import AbstractView from './abstract.js';

const createLoadingTemplate = () => {
  return '<p class="trip-events__msg" style="color: red">Loading error</p>';
};

export default class LoadingError extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
