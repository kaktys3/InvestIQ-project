
import { styled } from '../stitches.config';

export const AnalyticsWrapper = styled('section', {
  width: '100%',
  color: '$textPrimary',
  fontFamily: '$sans',
});

export const SectionHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
  marginBottom: '22px',
});

export const SectionTitle = styled('h2', {
  margin: '0 0 6px',
  fontSize: '20px',
  fontWeight: 600,
  color: '$textPrimary',
});

export const TotalLabel = styled('span', {
  color: '#FF9DBB',
  fontSize: '12px',
  fontWeight: 600,
});

export const CategoryGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
  gap: '12px',

  '@bpTablet': {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },

  '@bpMobile': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
});

export const CategoryCard = styled('button', {
  minWidth: 0,
  padding: '14px 12px',
  textAlign: 'left',
  border: '1px solid $border',
  borderTop: '3px solid transparent',
  borderRadius: '$card',
  color: '$textPrimary',
  background: '$bgCard',
  cursor: 'pointer',
  transition: 'border-color 0.2s, transform 0.2s',

  '&:hover': {
    borderColor: '$accentOrange',
    transform: 'translateY(-2px)',
  },

  variants: {
    active: {
      true: {
        borderColor: '#354C59',
        borderTopColor: '#FF5986',
        background: 'linear-gradient(145deg, #1D3535, $bgCard)',
      },
      false: {},
    },
  },

  defaultVariants: {
    active: false,
  },
});

export const CategoryTop = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '6px',
  marginBottom: '12px',
});

export const CategoryIcon = styled('span', {
  display: 'grid',
  placeItems: 'center',
  width: '34px',
  height: '34px',
  borderRadius: '$input',
  background: '$border',
  fontSize: '18px',
});

export const CategoryPercent = styled('span', {
  padding: '3px 6px',
  borderRadius: '10px',
  background: '#27363B',
  color: '$accentGreen',
  fontSize: '11px',
  fontWeight: 700,
});

export const CategoryName = styled('div', {
  overflow: 'hidden',
  marginBottom: '8px',
  fontSize: '13px',
  fontWeight: 600,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const CategoryAmount = styled('div', {
  marginBottom: '12px',
  fontSize: '17px',
  fontWeight: 700,
  overflowWrap: 'anywhere',
});

export const ProgressTrack = styled('div', {
  width: '100%',
  height: '5px',
  overflow: 'hidden',
  borderRadius: '8px',
  background: '$bgMain',
});

export const ProgressFill = styled('div', {
  height: '100%',
  borderRadius: 'inherit',
  background: '$gradientPrimary',
  transition: 'width 0.3s ease',

  variants: {
    percentage: {
      0: { width: '0%' },
    },
  },

  // Значення ширини передається через style у компоненті
});

export const DetailsPanel = styled('section', {
  marginTop: '24px',
  padding: '22px 18px',
  border: '1px solid $border',
  borderRadius: '$card',
  background: '$bgCard',
});

export const DetailsHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
  marginBottom: '26px',

  '& p': {
    margin: '6px 0 0',
    color: '$textSecondary',
    fontSize: '12px',
  },
});

export const DetailsTitle = styled('h3', {
  margin: 0,
  fontSize: '17px',
  color: '$textPrimary',
});

export const ChartControls = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '7px',
});

export const ControlButton = styled('button', {
  padding: '8px 11px',
  border: '1px solid $border',
  borderRadius: '$button',
  color: '$textSecondary',
  background: '$bgInput',
  fontSize: '12px',
  cursor: 'pointer',

  '&:hover': {
    borderColor: '$accentGreen',
  },

  variants: {
    active: {
      true: {
        borderColor: '$accentGreen',
        color: '$accentGreen',
      },
      false: {},
    },
  },

  defaultVariants: {
    active: false,
  },
});

export const Chart = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-around',
  gap: '12px',
  minHeight: '250px',
  padding: '12px 4px 0',
  borderBottom: '1px solid $border',

  '@bpMobile': {
    justifyContent: 'flex-start',
    overflowX: 'auto',
  },
});

export const ChartColumn = styled('div', {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minWidth: '65px',
});

export const BarTrack = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  width: '100%',
  height: '210px',
});

export const Bar = styled('div', {
  width: 'min(54px, 75%)',
  minHeight: '3px',
  borderRadius: '8px 8px 0 0',
  background: 'linear-gradient(180deg, #FF644D 0%, #FF4279 55%, #A54BE4 100%)',
  boxShadow: '0 0 16px rgb(255 76 111 / 12%)',
  transition: 'height 0.3s ease',

  variants: {
    height: {
      small: { height: '25%' },
      medium: { height: '50%' },
      large: { height: '75%' },
    },
  },
});

export const BarValue = styled('span', {
  position: 'absolute',
  top: '-2px',
  left: '50%',
  width: 'max-content',
  maxWidth: '100%',
  transform: 'translateX(-50%)',
  color: '$textPrimary',
  fontSize: '10px',
  textAlign: 'center',
  overflowWrap: 'anywhere',
});

export const BarLabel = styled('span', {
  minHeight: '34px',
  padding: '8px 2px 0',
  color: '$textSecondary',
  fontSize: '11px',
  textAlign: 'center',
  overflowWrap: 'anywhere',
});

export const EmptyState = styled('div', {
  padding: '32px 16px',
  border: '1px dashed $border',
  borderRadius: '$card',
  color: '$textSecondary',
  textAlign: 'center',
});