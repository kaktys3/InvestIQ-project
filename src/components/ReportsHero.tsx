import { useAppSelector } from "../Store";
import { statisticCategory } from "../Store/finansSelector";
import type { statisticTransaction } from "../Store/interface";
import {
  ReportsHeroWrapper,
  HeroTopBar,
  PageTitleBlock,
  KpiGrid,
  KpiCard,
  KpiHeader,
  KpiLabel,
  KpiValue,
  TrendBadge,
} from "../styles/RepotsHero.styles";

export function ReportsHero() {
  const statisticTransactionData = useAppSelector(statisticCategory);

  const totalExpense = (statisticTransactionData as statisticTransaction)?.category_Data ?? 0;

  return (
    <>
    {/* <ReportsHeroWrapper>
      <HeroTopBar>
        <PageTitleBlock>
          <h2>Аналітика та Звіти</h2>
          <span>Огляд фінансових показників і структури витрат</span>
        </PageTitleBlock>
      </HeroTopBar>

      <KpiGrid>
        <KpiCard>
          <KpiHeader>
            <KpiLabel>● Витрати за період</KpiLabel>
            <TrendBadge isGood={false}>Статистика</TrendBadge>
          </KpiHeader>
          <KpiValue type="expense">{totalExpense.toLocaleString("uk-UA")} грн</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiHeader>
            <KpiLabel>● Доходи за період</KpiLabel>
            <TrendBadge isGood={true}>Статистика</TrendBadge>
          </KpiHeader>
          <KpiValue type="income">{totalIncome.toLocaleString("uk-UA")} грн</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiHeader>
            <KpiLabel>● Чистий залишок</KpiLabel>
            <TrendBadge isGood={netBalance >= 0}>Заощадження</TrendBadge>
          </KpiHeader>
          <KpiValue type="net">{netBalance.toLocaleString("uk-UA")} грн</KpiValue>
        </KpiCard>
      </KpiGrid>
    </ReportsHeroWrapper> */}
    </>
  );
}

export default ReportsHero;