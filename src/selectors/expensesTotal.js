export default (expenses) => {
  const reducer = (acc, expense) => acc + expense.amount;
  return expenses.reduce(reducer, 0);
};
