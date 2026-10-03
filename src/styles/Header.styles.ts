import { styled } from '../stitches.config';

export const StyledHeader = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 24px',
  backgroundColor: '$bgCard',
  borderBottom: '1px solid $border',
  color: '$textPrimary',
});

export const LogoWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
});

export const LogoDot = styled('span', {
  color: '$accentOrange',
  fontSize: '14px',
});

export const LogoTitle = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '& strong': {
    fontSize: '18px',
    fontWeight: 800,
    letterSpacing: '1px',
    lineHeight: 1.1,
  },
  '& small': {
    fontSize: '9px',
    color: '$textSecondary',
    letterSpacing: '1.5px',
  },
});

export const NavContainer = styled('nav', {
  display: 'flex',
  gap: '6px',
  backgroundColor: '$bgInput',
  padding: '4px',
  borderRadius: '$button',
  border: '1px solid $border',
});

export const NavButton = styled('button', {
  background: 'transparent',
  border: 'none',
  color: '$textSecondary',
  padding: '8px 18px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.5px',
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
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      },
    },
  },
});

export const UserInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '13px',
});

export const BalanceBlock = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '$bgInput',
  padding: '6px 12px',
  borderRadius: '20px',
  border: '1px solid $border',
  '& strong': {
    color: '$textPrimary',
    fontSize: '14px',
    fontWeight: 700,
  },
});

export const StatusDot = styled('span', {
  color: '$accentGreen',
  fontSize: '10px',
});

export const StatusBadge = styled('span', {
  fontSize: '9px',
  fontWeight: 700,
  color: '$accentGreen',
  backgroundColor: 'rgba(0, 230, 118, 0.15)',
  padding: '2px 6px',
  borderRadius: '4px',
  letterSpacing: '0.5px',
});

export const Avatar = styled('div', {
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  background: '$gradientPrimary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  color: '#FFFFFF',
  fontSize: '12px',
});

export const UserName = styled('span', {
  fontWeight: 600,
  color: '$textPrimary',
});

export const LogoutButton = styled('button', {
  background: 'none',
  border: 'none',
  color: '$textSecondary',
  fontSize: '16px',
  cursor: 'pointer',
  padding: '6px 8px',
  borderRadius: '6px',
  transition: 'all 0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: '$accentRed',
    backgroundColor: 'rgba(255, 82, 82, 0.15)',
  },
});