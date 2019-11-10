import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onFormSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onFormSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ startAddExpense }, dispatch)
);

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
