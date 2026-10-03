import { useState } from 'react';
import {
  ReportsHeroWrapper,
  HeroTopBar,
  PageTitleBlock,
  PeriodSelector,
  PeriodButton,
  KpiGrid,
  KpiCard,
  KpiHeader,
  KpiLabel,
  KpiValue,
  TrendBadge,
} from '../styles/RepotsHero.styles';

type Period = 'month' | 'quarter' | 'year' | 'all';

export function ReportsHero() {
  const [period, setPeriod] = useState<Period>('month');

  return (
    <ReportsHeroWrapper>
      <HeroTopBar>
        <PageTitleBlock>
          <h2>Аналітика та Звіти</h2>
          <span>Огляд фінансових показників і структури витрат</span>
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
            <TrendBadge isGood={true}>-12.4%</TrendBadge>
          </KpiHeader>
          <KpiValue type="expense">-32 450.00 грн</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiHeader>
            <KpiLabel> Доходи за період</KpiLabel>
            <TrendBadge isGood={true}> +8.1%</TrendBadge>
          </KpiHeader>
          <KpiValue type="income">65 000.00 грн</KpiValue>
        </KpiCard>

        <KpiCard>
          <KpiHeader>
            <KpiLabel>Чистий залишок</KpiLabel>
            <TrendBadge isGood={true}>Заощадження 50%</TrendBadge>
          </KpiHeader>
          <KpiValue type="net">+32 550.00 грн</KpiValue>
        </KpiCard>
      </KpiGrid>
    </ReportsHeroWrapper>
  );
}

export default ReportsHero;