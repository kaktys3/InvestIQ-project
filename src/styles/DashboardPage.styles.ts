import { styled } from '../stitches.config';

export const DashboardContainer = styled('div', {
  padding: '24px',
  maxWidth: '1400px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

/* --- Верхній блок: Баланс та Форма --- */
export const HeroCard = styled('div', {
  backgroundColor: '$bgCard',
  border: '1px solid $border',
  borderRadius: '$card',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const HeroTopRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
});

export const BalanceInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  '& label': {
    fontSize: '11px',
    color: '$textSecondary',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  '& h1': {
    fontSize: '36px',
    fontWeight: 800,
    color: '$textPrimary',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
});

export const ModeToggleGroup = styled('div', {
  display: 'flex',
  gap: '8px',
});

export const ToggleButton = styled('button', {
  padding: '10px 24px',
  borderRadius: '$button',
  fontSize: '12px',
  fontWeight: 800,
  border: 'none',
  cursor: 'pointer',
  letterSpacing: '0.5px',
  transition: 'all 0.2s ease',
  variants: {
    activeType: {
      expense: {
        backgroundColor: '$accentRed',
        color: '#FFF',
        boxShadow: '0 4px 12px rgba(255, 82, 82, 0.3)',
      },
      income: {
        backgroundColor: '$accentGreen',
        color: '#000',
        boxShadow: '0 4px 12px rgba(0, 230, 118, 0.3)',
      },
      inactive: {
        backgroundColor: '$bgInput',
        color: '$textSecondary',
        border: '1px solid $border',
        '&:hover': { color: '$textPrimary' },
      },
    },
  },
});

/* --- Форма "Нова операція" --- */
export const FormSection = styled('form', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '12px',
  alignItems: 'end',
  borderTop: '1px solid $border',
  paddingTop: '20px',
  '@bpTablet': {
    gridTemplateColumns: '140px 1fr 220px 140px auto',
  },
});

export const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  '& label': {
    fontSize: '11px',
    color: '$textSecondary',
    fontWeight: 600,
  },
});

export const Input = styled('input', {
  backgroundColor: '$bgInput',
  border: '1px solid $border',
  borderRadius: '$input',
  padding: '10px 12px',
  color: '$textPrimary',
  fontSize: '13px',
  outline: 'none',
  width: '100%',
  '&:focus': { borderColor: '$accentOrange' },
});

export const Select = styled('select', {
  backgroundColor: '$bgInput',
  border: '1px solid $border',
  borderRadius: '$input',
  padding: '10px 12px',
  color: '$textPrimary',
  fontSize: '13px',
  outline: 'none',
  width: '100%',
});

export const SubmitButton = styled('button', {
  background: '$gradientPrimary',
  color: '#FFF',
  border: 'none',
  borderRadius: '$button',
  padding: '10px 24px',
  fontWeight: 700,
  fontSize: '13px',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  '&:hover': { opacity: 0.9 },
});

export const ClearButton = styled('button', {
  backgroundColor: 'transparent',
  color: '$textSecondary',
  border: '1px solid $border',
  borderRadius: '$button',
  padding: '10px 16px',
  fontWeight: 600,
  fontSize: '13px',
  cursor: 'pointer',
  '&:hover': { color: '$textPrimary' },
});

/* --- Основна сітка (Таблиця + Зведення) --- */
export const MainGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '24px',
  '@bpDesktop': {
    gridTemplateColumns: '1fr 340px',
  },
});

export const Card = styled('div', {
  backgroundColor: '$bgCard',
  border: '1px solid $border',
  borderRadius: '$card',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const CardHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& h3': {
    fontSize: '14px',
    fontWeight: 800,
    letterSpacing: '0.5px',
    color: '$textPrimary',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
});

/* --- Таблиця операцій --- */
export const TableWrapper = styled('div', {
  overflowX: 'auto',
});

export const Table = styled('table', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 6px',
});

export const Th = styled('th', {
  color: '$textSecondary',
  fontSize: '11px',
  textTransform: 'uppercase',
  textAlign: 'left',
  padding: '8px 12px',
});

export const Tr = styled('tr', {
  '& td': {
    backgroundColor: '$bgInput',
    padding: '12px',
    fontSize: '13px',
    '&:first-child': { borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' },
    '&:last-child': { borderTopRightRadius: '6px', borderBottomRightRadius: '6px' },
  },
});

export const AmountText = styled('span', {
  fontWeight: 700,
  variants: {
    isExpense: {
      true: { color: '$textPrimary' },
      false: { color: '$accentGreen' },
    },
  },
});

/* --- Віджет Зведення --- */
export const SummaryList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const SummaryRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '$bgInput',
  padding: '10px 14px',
  borderRadius: '8px',
  fontSize: '12px',
  '& span': { color: '$textSecondary', fontWeight: 600 },
  '& strong': { color: '$textPrimary' },
});

export const AiHintBox = styled('div', {
  backgroundColor: 'rgba(123, 44, 191, 0.12)',
  border: '1px solid rgba(123, 44, 191, 0.3)',
  borderRadius: '8px',
  padding: '12px',
  fontSize: '12px',
  lineHeight: '1.4',
  color: '$textPrimary',
});

export const SecurityNotice = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '12px',
    padding: '10px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '8px',
    border: '1px dashed $border',
    fontSize: '11px',
    color: '$textSecondary',
    lineHeight: '1.4',
    '& strong': {
      color: '$textPrimary',
      fontWeight: 600,
    },
  });
  
  export const SecurityBadge = styled('span', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    color: '$accentGreen',
    fontSize: '12px',
    flexShrink: 0,
  });