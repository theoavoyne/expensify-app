import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {
  sortByAmount,
  sortByDate,
  setTextFilter,
  setStartDate,
  setEndDate
} from '../actions/filters';

class ExpenseListFilter extends React.Component {
  onStartDateChange = (date) => {
    if (!date) {
      this.props.dispatch(setStartDate(null));
    } else if (date <= this.props.filters.endDate || !this.props.filters.endDate) {
      const dateMoment = moment(date);
      this.props.dispatch(setStartDate(dateMoment));
    }
  }

  onEndDateChange = (date) => {
    if (!date) {
      this.props.dispatch(setEndDate(null));
    } else if (date >= this.props.filters.startDate || !this.props.filters.startDate) {
      const dateMoment = moment(date);
      this.props.dispatch(setEndDate(dateMoment));
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={(e) => this.props.dispatch(setTextFilter(e.target.value))}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={(e) => {
            const { value } = e.target;
            if (value === 'date') {
              this.props.dispatch(sortByDate());
            } else if (value === 'amount') {
              this.props.dispatch(sortByAmount());
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DatePicker
          selected={this.props.filters.startDate ? this.props.filters.startDate.toDate() : null}
          onChange={this.onStartDateChange}
          maxDate={this.props.filters.endDate ? this.props.filters.endDate.toDate() : null}
          isClearable
        />
        <DatePicker
          selected={this.props.filters.endDate ? this.props.filters.endDate.toDate() : null}
          onChange={this.onEndDateChange}
          minDate={this.props.filters.startDate ? this.props.filters.startDate.toDate() : null}
          isClearable
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
});

export default connect(mapStateToProps)(ExpenseListFilter);
