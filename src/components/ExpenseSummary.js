import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expensesTotal';

export const ExpenseSummary = ({ expensesCount, expensesTotal }) => {
  const expensePluralized = expensesCount === 1 ? 'expense' : 'expenses';
  const totalFormatted = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <h1> Viewing {expensesCount} {expensePluralized} totalling {totalFormatted}</h1>
    </div>
  );
};

const mapStateToProps = ((state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
});

export default connect(mapStateToProps)(ExpenseSummary);
