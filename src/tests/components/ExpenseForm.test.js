import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import _ from 'lodash';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('Should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm with expense data correctly', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  const event = { preventDefault: () => {} };
  wrapper.find('form').simulate('submit', event);
  expect(wrapper.state('error')).toBeTruthy();
  expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = 'New description';
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('Should set note on on textarea change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = 'New note';
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('Should set amount if valid input', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = '23.50';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('Should not set amount if invalid input', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = '12.122';
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBeFalsy();
});

test('Should call onSubmit prop for valid form submission', () => {
  const onFormSubmit = jest.fn();
  const wrapper = shallow(
    <ExpenseForm
      onSubmit={onFormSubmit}
      expense={expenses[1]}
    />
  );
  const event = { preventDefault: () => {} };
  wrapper.find('form').simulate('submit', event);
  expect(wrapper.state('error')).toBe('');
  expect(onFormSubmit).toHaveBeenLastCalledWith(
    _.omit(expenses[1], 'id')
  );
});

test('Should set new date on date change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const date = moment(1000);
  wrapper.find('t').prop('onChange')(date.valueOf());
  expect(wrapper.state('createdAt')).toEqual(date);
});
