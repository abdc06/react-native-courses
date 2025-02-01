import { useSelector } from 'react-redux';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpenses() {
  const expenses = useSelector((state) => state.expenses);

  return <ExpensesOutput expenses={expenses} expensesPeriod="Total" />;
}

export default AllExpenses;
