import { shallow } from 'enzyme';

export function emptyFunc() {
  return null;
}

export function wrap(component) {
  return shallow(component);
}

export function wrapAndRender(component) {
  return wrap(component).render();
}

export function wrapAndSetState(component, state) {
  const wrapper = wrap(component);
  wrapper.setState(state);
  return wrapper;
}

export function setStateAndRender(component, state) {
  const statefulWrapper = wrap(component).setState(state);
  return statefulWrapper.render();
}
