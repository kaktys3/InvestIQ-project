import { styled } from '../stitches.config';

export const ReportsHeroWrapper = styled('div', {
  backgroundColor: '$bgCard',
  border: '1px solid $border',
  borderRadius: '$card',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

/* --- Шапка Hero: Заголовок та Перемикач періодів --- */
export const HeroTopBar = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
});

export const PageTitleBlock = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  '& h2': {
    fontSize: '22px',
    fontWeight: 800,
    color: '$textPrimary',
    letterSpacing: '0.5px',
  },
  '& span': {
    fontSize: '12px',
    color: '$textSecondary',
  },
});

export const PeriodSelector = styled('div', {
  display: 'flex',
  gap: '4px',
  backgroundColor: '$bgInput',
  padding: '4px',
  borderRadius: '$button',
  border: '1px solid $border',
});

export const PeriodButton = styled('button', {
  background: 'transparent',
  border: 'none',
  color: '$textSecondary',
  padding: '6px 14px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '$textPrimary',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$bgCard',
        color: '$accentOrange',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
      },
    },
  },
});

/* --- Сітка KPI карток --- */
export const KpiGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  '@bpTablet': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

export const KpiCard = styled('div', {
  backgroundColor: '$bgInput',
  border: '1px solid $border',
  borderRadius: '$card',
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  position: 'relative',
  overflow: 'hidden',
});

export const KpiHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const KpiLabel = styled('span', {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '$textSecondary',
  letterSpacing: '0.5px',
});

export const KpiValue = styled('div', {
  fontSize: '26px',
  fontWeight: 800,
  letterSpacing: '-0.5px',
  variants: {
    type: {
      expense: { color: '$accentRed' },
      income: { color: '$accentGreen' },
      net: { color: '$textPrimary' },
    },
  },
});

export const TrendBadge = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '11px',
  fontWeight: 700,
  padding: '3px 8px',
  borderRadius: '12px',
  variants: {
    // isGood: {
    //   true: {
    //     backgroundColor: 'rgba(0, 230, 118, 0.15)',
    //     color: '$accentGreen',
    //   },
    //   false: {
    //     backgroundColor: 'rgba(255, 82, 82, 0.15)',
    //     color: '$accentRed',
    //   },
    // },
  },
});