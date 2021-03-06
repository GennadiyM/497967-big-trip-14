import AbstractView from './abstract.js';

const createTripRouteTemplate = () => {
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>`;
};

export default class TripRoute extends AbstractView {
  getTemplate() {
    return createTripRouteTemplate();
  }
}
