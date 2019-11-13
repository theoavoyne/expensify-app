import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expensesTotal';

export const ExpenseSummary = ({ expensesCount, expensesTotal }) => {
  const expensePluralized = expensesCount === 1 ? 'expense' : 'expenses';
  const totalFormatted = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing&nbsp;
          <span>{expensesCount}</span>&nbsp;
          {expensePluralized} totalling&nbsp;
          <span>{totalFormatted}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
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
