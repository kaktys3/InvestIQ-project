
import { styled } from '../stitches.config';

export const AnalyticsWrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  padding: '24px',
  background: '$bgCard',
  border: '1px solid $border',
  borderRadius: '$card',
  color: '$textPrimary',
  fontFamily: '$sans',

  '& h2': {
    margin: 0,
    fontSize: '22px',
    overflowWrap: 'anywhere',
  },

  '& h3': {
    margin: '0 0 8px',
    fontSize: '17px',
  },

  '& p': {
    color: '$textSecondary',
    fontSize: '13px',
    margin: '8px 0 0',
  },

  '@bpTablet': {
    padding: '18px',
    gap: '20px',
  },

  '@bpMobile': {
    padding: '14px',
    gap: '18px',
    borderRadius: '10px',

    '& h2': {
      fontSize: '19px',
    },

    '& h3': {
      fontSize: '16px',
    },
  },
});

export const AnalyticsHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
  minWidth: 0,

  '@bpMobile': {
    alignItems: 'stretch',
    flexDirection: 'column',
    gap: '12px',
  },
});

export const ExportButton = styled('button', {
  border: 'none',
  borderRadius: '$button',
  padding: '11px 16px',
  background: '$gradientPrimary',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  flexShrink: 0,

  '&:hover': {
    opacity: 0.88,
  },

  '&:focus-visible': {
    outline: '2px solid $accentOrange',
    outlineOffset: '3px',
  },

  '@bpMobile': {
    width: '100%',
    minHeight: '44px',
  },
});

export const StatsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '14px',
  minWidth: 0,

  '@bpDesktop': {
    gap: '18px',
  },

  '@bpTablet': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '12px',
  },

  '@bpMobile': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '10px',
  },
});

export const StatCard = styled('div', {
  padding: '18px',
  minWidth: 0,
  boxSizing: 'border-box',
  borderRadius: '$card',
  background: '$bgInput',
  border: '1px solid $border',

  '@bpTablet': {
    padding: '14px',
  },

  '@bpMobile': {
    padding: '12px 10px',
    borderRadius: '$input',
  },
});

export const StatLabel = styled('div', {
  color: '$textSecondary',
  fontSize: '13px',
  marginBottom: '10px',
  lineHeight: 1.4,

  '@bpMobile': {
    fontSize: '11px',
    marginBottom: '8px',
  },
});

export const StatValue = styled('div', {
  fontSize: 'clamp(15px, 1.6vw, 22px)',
  fontWeight: 700,
  lineHeight: 1.4,
  overflowWrap: 'anywhere',

  variants: {
    color: {
      green: { color: '$accentGreen' },
      red: { color: '$accentRed' },
    },
  },

  '@bpMobile': {
    fontSize: 'clamp(14px, 4vw, 18px)',
  },
});

export const ScoreTrack = styled('div', {
  width: '100%',
  height: '10px',
  margin: '14px 0 8px',
  overflow: 'hidden',
  borderRadius: '999px',
  background: '$bgInput',
  border: '1px solid $border',
});

export const ScoreFill = styled('div', {
  height: '100%',
  borderRadius: '999px',
  background: '$accentGreen',
  transition: 'width 250ms ease',
});

export const TransactionsTable = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minWidth: 0,
  marginTop: '12px',
});

export const TransactionRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 0',
  borderBottom: '1px solid $border',
  minWidth: 0,

  '&:last-child': {
    borderBottom: 'none',
  },

  '@bpMobile': {
    gap: '9px',
    padding: '12px 0',
  },
});

export const TransactionIcon = styled('div', {
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  width: '42px',
  height: '42px',
  borderRadius: '$input',
  background: '$bgInput',
  fontSize: '20px',

  '@bpMobile': {
    width: '34px',
    height: '34px',
    fontSize: '17px',
  },
});

export const TransactionInfo = styled('div', {
  flex: 1,
  minWidth: 0,
});

export const TransactionName = styled('div', {
  fontWeight: 600,
  fontSize: '14px',
  overflowWrap: 'anywhere',

  '@bpMobile': {
    fontSize: '12px',
  },
});

export const TransactionCategory = styled('div', {
  marginTop: '5px',
  color: '$textSecondary',
  fontSize: '12px',
  overflowWrap: 'anywhere',

  '@bpMobile': {
    fontSize: '10px',
    lineHeight: 1.4,
  },
});

export const Amount = styled('div', {
  flexShrink: 0,
  maxWidth: '45%',
  fontSize: '14px',
  fontWeight: 700,
  textAlign: 'right',
  overflowWrap: 'anywhere',

  variants: {
    color: {
      green: { color: '$accentGreen' },
      red: { color: '$accentRed' },
    },
  },

  '@bpMobile': {
    fontSize: '12px',
  },
});

export const EmptyMessage = styled('p', {
  padding: '20px 0',
  color: '$textSecondary',
});