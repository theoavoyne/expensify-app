import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  onFormSubmit = (expense) => {
    this.props.addExpense(expense);
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
  bindActionCreators({ addExpense }, dispatch)
);

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
