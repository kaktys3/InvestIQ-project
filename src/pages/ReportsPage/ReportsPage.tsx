import ReportsHero from '../../components/ReportsHero';
import ExpenseAnalytics from '../../components/ExpenseAnalytics';
import ExpenseTransaction from '../../components/ExpenseTransaction'
import { useAppSelector } from '../../Store';
import { transactionAdapter } from '../../Store/finansSlice';

const transactionSelectors = transactionAdapter.getSelectors();

export default function ReportsPage() {
  const transactions = useAppSelector((state) =>
    transactionSelectors.selectAll(state.finans.transaction)
  );

  return (
    <>
      {/* <ReportsHero /> */}
      <ExpenseAnalytics transactions={transactions} />
      <ExpenseTransaction />
    </>
  );
}