import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {
  sortByAmount,
  sortByDate,
  setTextFilter,
  setStartDate,
  setEndDate
} from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  onStartDateChange = (date) => {
    if (!date) {
      this.props.setStartDate(null);
    } else if (date <= this.props.filters.endDate || !this.props.filters.endDate) {
      const dateMoment = moment(date);
      this.props.setStartDate(dateMoment);
    }
  }

  onEndDateChange = (date) => {
    if (!date) {
      this.props.setEndDate(null);
    } else if (date >= this.props.filters.startDate || !this.props.filters.startDate) {
      const dateMoment = moment(date);
      this.props.setEndDate(dateMoment);
    }
  }

  onTextChange = (e) => (
    this.props.setTextFilter(e.target.value)
  );

  onSortChange = (e) => {
    const { value } = e.target;
    if (value === 'date') {
      this.props.sortByDate();
    } else if (value === 'amount') {
      this.props.sortByAmount();
    }
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              value={this.props.filters.text}
              onChange={this.onTextChange}
              placeholder="Search expenses"
            />
          </div>
          <div className="input-group__item">
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
              className="select"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DatePicker
              selected={this.props.filters.startDate ? this.props.filters.startDate.toDate() : null}
              onChange={this.onStartDateChange}
              maxDate={this.props.filters.endDate ? this.props.filters.endDate.toDate() : null}
              isClearable
              className="datepicker"
            />
            <DatePicker
              selected={this.props.filters.endDate ? this.props.filters.endDate.toDate() : null}
              onChange={this.onEndDateChange}
              minDate={this.props.filters.startDate ? this.props.filters.startDate.toDate() : null}
              isClearable
              className="datepicker"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    setTextFilter,
    sortByDate,
    sortByAmount,
    setStartDate,
    setEndDate
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
