import { useMemo, useState } from 'react';
import { useAppSelector } from '../Store/';
import { transactionAdapter } from '../Store/finansSlice'

import {
  ReportsHeroWrapper,
  HeroTopBar,
  PageTitleBlock,
  KpiGrid,
  KpiCard,
  KpiHeader,
  KpiLabel,
  KpiValue,
} from '../styles/RepotsHero.styles';


type Period = 'month' | 'quarter' | 'year' | 'all';

const transactionSelectors = transactionAdapter.getSelectors();

const currencyFormatter = new Intl.NumberFormat('uk-UA', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function ReportsHero() {
  const statisticTransactionData = useAppSelector(statisticCategory);

  const totalExpense = (statisticTransactionData as statisticTransaction)?.category_Data ?? 0;

  const transactions = useAppSelector((state) =>
  transactionSelectors.selectAll(
    state.finans.transaction
  )
);

  const { income, expense, net } = useMemo(() => {
    const now = new Date();

    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    if (period === 'quarter') {
      const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;

      start.setMonth(quarterStartMonth);
    }

    if (period === 'year') {
      start.setMonth(0, 1);
    }

    if (period === 'all' && transactions.length > 0) {
      const earliestDate = transactions.reduce(
        (earliest, transaction) =>
          transaction.transaction_date < earliest
            ? transaction.transaction_date
            : earliest,
        transactions[0].transaction_date
      );

      const [year, month, day] = earliestDate
        .split('-')
        .map(Number);

      start.setFullYear(year, month - 1, day);
    }

    const startDate = [
      start.getFullYear(),
      String(start.getMonth() + 1).padStart(2, '0'),
      String(start.getDate()).padStart(2, '0'),
    ].join('-');

    const endDate = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-');

    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.transaction_date >= startDate &&
        transaction.transaction_date <= endDate
    );

    const totals = filteredTransactions.reduce(
      (result, transaction) => {
        if (transaction.type === 'income') {
          result.income += Number(transaction.amount);
        } else if (transaction.type === 'expense') {
          result.expense += Number(transaction.amount);
        }

        return result;
      },
      { income: 0, expense: 0 }
    );

    return {
      income: totals.income,
      expense: totals.expense,
      net: totals.income - totals.expense,
    };
  }, [transactions, period]);

  const formatMoney = (amount: number) =>
    `${currencyFormatter.format(amount)} грн`;

  return (
    <>
    {/* <ReportsHeroWrapper>
      <HeroTopBar>
        <PageTitleBlock>
          <h2>Аналітика та Звіти</h2>
          <span>
            Огляд фінансових показників і структури витрат
          </span>
        </PageTitleBlock>

        <PeriodSelector>
          <PeriodButton
            active={period === 'month'}
            onClick={() => setPeriod('month')}
          >
            Місяць
          </PeriodButton>

          <PeriodButton
            active={period === 'quarter'}
            onClick={() => setPeriod('quarter')}
          >
            Квартал
          </PeriodButton>

          <PeriodButton
            active={period === 'year'}
            onClick={() => setPeriod('year')}
          >
            Рік
          </PeriodButton>

          <PeriodButton
            active={period === 'all'}
            onClick={() => setPeriod('all')}
          >
            Весь час
          </PeriodButton>
        </PeriodSelector>
      </HeroTopBar>

      <KpiGrid>
        <KpiCard>
          <KpiHeader>
            <KpiLabel>Витрати за період</KpiLabel>
          </KpiHeader>
          <KpiValue type="expense">
            -{formatMoney(expense)}
          </KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiHeader>
            <KpiLabel>Доходи за період</KpiLabel>
          </KpiHeader>
          <KpiValue type="income">
            {formatMoney(income)}
          </KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiHeader>
            <KpiLabel>Чистий залишок</KpiLabel>
          </KpiHeader>
          <KpiValue type="net">
            {net > 0 ? '+' : ''}{formatMoney(net)}
          </KpiValue>
        </KpiCard>
      </KpiGrid>
    </ReportsHeroWrapper> */}
    </>
  );
}

export default ReportsHero;