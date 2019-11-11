import moment from 'moment';

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from '../../actions/filters';

// SET TEXT FILTER

test('setTextFilter() should setup action object with data correctly', () => {
  const text = 'Something';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});

test('setTextFilter() should setup action object with default correctly', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

// SORT BY DATE

test('sortByDate() should setup action object correctly', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

// SORT BY AMOUNT

test('sortByAmount() should setup action object correctly', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

// SET START DATE

test('setStartDate() should setup action object correctly', () => {
  const action = setStartDate(moment());
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment()
  });
});

// SET END DATE

test('setEndDate() should setup action object correctly', () => {
  const action = setEndDate(moment());
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment()
  });
});
