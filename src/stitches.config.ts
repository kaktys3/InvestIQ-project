import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      
      bgMain: '#0B0E14',
      bgCard: '#131822',
      bgInput: '#1C2333',
      border: '#2A3447',

      textPrimary: '#FFFFFF',
      textSecondary: '#8B98A5',

      accentOrange: '#FF7A00',
      accentGreen: '#00E676',
      accentRed: '#FF5252',
      gradientPrimary: 'linear-gradient(135deg, #FF2A7A 0%, #7B2CBF 100%)',
    },
    radii: {
      card: '12px',
      input: '8px',
      button: '8px',
    },
    fonts: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
    },
  },
  media: {
    bpMobile: '(min-width: 320px)',
    bpTablet: '(min-width: 768px)',
    bpDesktop: '(min-width: 1280px)',
  },
});