import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';

import {
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};

  expenses.forEach((expense) => {
    expensesData[expense.id] = { ..._.omit(expense, 'id') };
  });

  database
    .ref('expenses')
    .set(expensesData)
    .then(() => done());
});

// ADD EXPENSE

test('addExpense() should setup action object correctly', () => {
  const expenseData = expenses[0];
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  });
});

test('startAddExpense() should add expense to database and store correctly', (done) => {
  const store = createMockStore({});
  const expense = {
    description: 'Mouse',
    amount: 3000,
    note: 'This is my note',
    createdAt: 1000
  };

  store
    .dispatch(startAddExpense(expense))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expense
        }
      });
      return database
        .ref(`expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expense);
      done();
    });
});

test('startAddExpense() should add expense to database and store with defaults correctly', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });
      return database
        .ref(`expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

// REMOVE EXPENSE

test('removeExpense() should setup action object correctly', () => {
  const action = removeExpense('123abc');
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('startRemoveExpense() should remove expense from firebase', (done) => {
  const store = createMockStore({});
  const { id } = expenses[0];

  store
    .dispatch(startRemoveExpense(id))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return database.ref(`expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

// EDIT EXPENSE

test('editExpense() should setup action object correctly', () => {
  const id = expenses[2];
  const action = editExpense(id, { description: 'Car' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates: {
      description: 'Car'
    }
  });
});

test('startEditExpense() should edit an expense on both the store and firebase', (done) => {
  const store = createMockStore({});
  const updates = { description: 'Car' };
  const { id } = expenses[2];

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual({ ..._.omit(expenses[2], 'id'), ...updates });
      done();
    });
});

// SET EXPENSES

test('setExpenses() should setup action object with data correctly', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('startSetExpenses() should fetch the expenses from firebase and add them to the store', (done) => {
  const store = createMockStore({});

  store
    .dispatch(startSetExpenses())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      done();
    });
});
