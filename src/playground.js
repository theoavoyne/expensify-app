import { createStore } from 'redux';

const store = createStore((state = { count: 0 }) => state);

console.log(store.getState());
