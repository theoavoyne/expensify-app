import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseSummary } from '../../components/ExpenseSummary';

test('Should correctly render ExpenseSummary with one expense', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={1} expensesTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should correctly render ExpenseSummary with multiple expense', () => {
  const wrapper = shallow(<ExpenseSummary expensesCount={23} expensesTotal={56789} />);
  expect(wrapper).toMatchSnapshot();
});
