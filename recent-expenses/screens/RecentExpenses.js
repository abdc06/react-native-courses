import { useSelector } from 'react-redux';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
  const expenses = useSelector((state) => state.expenses);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}

export default RecentExpenses;
