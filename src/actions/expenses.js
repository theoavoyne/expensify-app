import database from '../firebase/firebase';

// ADD EXPENSE

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => (
  (dispatch) => {
    const expense = {
      description: expenseData.description || '',
      note: expenseData.note || '',
      amount: expenseData.amount || 0,
      createdAt: expenseData.createdAt || 0
    };

    return database
      .ref('expenses')
      .push(expense)
      .then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }));
      });
  }
);

// REMOVE EXPENSE

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT EXPENSE

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET EXPENSES

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => (
  (dispatch) => (
    database
      .ref('expenses')
      .once('value')
      .then((snapshot) => {
        const expensesObj = snapshot.val() || {};

        const expenses = Object.keys(expensesObj).map((key) => ({
          id: key,
          ...expensesObj[key]
        }));

        dispatch(setExpenses(expenses));
      })
  )
);
