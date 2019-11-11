import moment from 'moment';

import filtersReducer from '../../reducers/filters';

// INIT

test('@@INIT should setup default filters values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

// SET TEXT FILTER

test('SET_TEXT_FILTER should set text filter', () => {
  const action = { type: 'SET_TEXT_FILTER', text: 'Something' };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('Something');
});

// SORT BY DATE

test('SORT_BY_DATE should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

// SORT BY AMOUNT

test('SORT_BY_AMOUNT should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

// SET START DATE

test('SET_START_DATE should set startDate', () => {
  const startDate = moment();
  const action = { type: 'SET_START_DATE', startDate };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(startDate);
});

// SET END DATE

test('SET_END_DATE should set endDate', () => {
  const endDate = moment();
  const action = { type: 'SET_END_DATE', endDate };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});
