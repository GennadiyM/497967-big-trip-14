import AbstractView from './abstract.js';

const createTripEventsTemplate = () => {
  return `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>`;
};

export default class TripEvents extends AbstractView {
  getTemplate() {
    return createTripEventsTemplate();
  }
}
