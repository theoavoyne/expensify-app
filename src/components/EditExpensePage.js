import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onFormSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }

  onButtonClick = () => {
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onFormSubmit}
        />
        <button
          type="submit"
          onClick={this.onButtonClick}
        >
          Remove
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ editExpense, startRemoveExpense }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
