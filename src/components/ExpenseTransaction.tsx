import { useMemo } from 'react';
import { useAppSelector } from '../Store';
import { transactionAdapter } from '../Store/finansSlice';
import type { Transaction } from '../Store/interface';
import {
  AnalyticsWrapper,
  AnalyticsHeader,
  ExportButton,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  ScoreTrack,
  ScoreFill,
  TransactionsTable,
  TransactionRow,
  TransactionInfo,
  TransactionIcon,
  TransactionName,
  TransactionCategory,
  Amount,
  EmptyMessage,
} from '../styles/ExpenseTransaction.styles';

const transactionSelectors = transactionAdapter.getSelectors();

const formatMoney = (amount: number) =>
  new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 2,
  }).format(amount);

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('uk-UA');

function exportCSV(transactions: Transaction[]) {
  const headers = [
    'Дата',
    'Назва',
    'Категорія',
    'Тип',
    'Сума',
  ];

  const rows = transactions.map((transaction) => [
    transaction.transaction_date,
    transaction.title,
    transaction.categories?.name ?? '',
    transaction.type === 'income' ? 'Дохід' : 'Витрата',
    transaction.amount,
  ]);

  const escapeCSV = (value: string | number) =>
    `"${String(value).replace(/"/g, '""')}"`;

  const csv = [
    headers,
    ...rows,
  ]
    .map((row) => row.map(escapeCSV).join(';'))
    .join('\r\n');

  const blob = new Blob(['\uFEFF', csv], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'financial-report.csv';
  link.click();

  URL.revokeObjectURL(url);
}

export default function RecentTransactionsAnalytics() {
  const transactions = useAppSelector((state) =>
    transactionSelectors.selectAll(state.finans.transaction)
  );

  const analytics = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) =>
        new Date(b.transaction_date).getTime() -
        new Date(a.transaction_date).getTime()
    );

    const income = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const expenses = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const totalAmount = transactions.reduce(
      (sum, transaction) => sum + Number(transaction.amount),
      0
    );

    const averageCheck = transactions.length
      ? totalAmount / transactions.length
      : 0;

    const dates = transactions
      .map((transaction) => transaction.transaction_date)
      .filter(Boolean)
      .sort();

    let averagePerDay = 0;

    if (dates.length) {
      const firstDate = new Date(`${dates[0]}T12:00:00`);
      const today = new Date();
      today.setHours(12, 0, 0, 0);

      const elapsedDays =
        Math.floor(
          (today.getTime() - firstDate.getTime()) / 86400000
        ) + 1;

      averagePerDay = transactions.length / Math.max(1, elapsedDays);
    }

    const score =
      income + expenses > 0
        ? Math.round((income / (income + expenses)) * 100)
        : 0;

    return {
      sorted,
      averageCheck,
      averagePerDay,
      score,
      income,
      expenses,
    };
  }, [transactions]);

  return (
    <AnalyticsWrapper>
      <AnalyticsHeader>
        <div>
          <h2>Останні транзакції</h2>
          <p>Історія операцій та фінансова статистика</p>
        </div>

        <ExportButton
          type="button"
          onClick={() => exportCSV(analytics.sorted)}
        >
          Експортувати CSV
        </ExportButton>
      </AnalyticsHeader>

      <StatsGrid>
        <StatCard>
          <StatLabel>Середній чек</StatLabel>
          <StatValue>{formatMoney(analytics.averageCheck)}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Транзакцій на день</StatLabel>
          <StatValue>{analytics.averagePerDay.toFixed(1)}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Доходи</StatLabel>
          <StatValue color="green">
            {formatMoney(analytics.income)}
          </StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Витрати</StatLabel>
          <StatValue color="red">
            {formatMoney(analytics.expenses)}
          </StatValue>
        </StatCard>
      </StatsGrid>

      <section>
        <h3>Аналітичний скоринг</h3>
        <p>
          Співвідношення доходів до суми доходів і витрат
        </p>

        <ScoreTrack>
          <ScoreFill style={{ width: `${analytics.score}%` }} />
        </ScoreTrack>

        <strong>{analytics.score}%</strong>
      </section>

      <section>
        <h3>Останні операції</h3>

        {analytics.sorted.length === 0 ? (
          <EmptyMessage>
            Транзакцій поки немає.
          </EmptyMessage>
        ) : (
          <TransactionsTable>
            {analytics.sorted.slice(0, 10).map((transaction) => (
              <TransactionRow key={transaction.id}>
                <TransactionIcon>
                  {transaction.icon || '💳'}
                </TransactionIcon>

                <TransactionInfo>
                  <TransactionName>
                    {transaction.title}
                  </TransactionName>

                  <TransactionCategory>
                    {transaction.categories?.name ?? 'Без категорії'}
                    {' · '}
                    {formatDate(transaction.transaction_date)}
                  </TransactionCategory>
                </TransactionInfo>

                <Amount
                  color={
                    transaction.type === 'income' ? 'green' : 'red'
                  }
                >
                  {transaction.type === 'income' ? '+' : '−'}
                  {formatMoney(Number(transaction.amount))}
                </Amount>
              </TransactionRow>
            ))}
          </TransactionsTable>
        )}
      </section>
    </AnalyticsWrapper>
  );
}