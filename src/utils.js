const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

export {render};
