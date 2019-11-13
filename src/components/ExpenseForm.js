import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      note: props.expense ? props.expense.note : '',
      error: ''
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt: moment(createdAt) }));
    }
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  }

  render() {
    return (
      <form
        action=""
        onSubmit={this.onFormSubmit}
        className="form"
      >
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          className="text-input"
        />
        <input
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
          className="text-input"
        />
        <DatePicker
          selected={this.state.createdAt.toDate()}
          onChange={this.onDateChange}
          className="datepicker"
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
          className="textarea"
        />
        <div>
          <button type="submit" className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}
