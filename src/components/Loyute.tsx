import { useState } from 'react';
import Header from './Header';
import Dashboard from '../pages/DashboardPage/DashboardPage';
import ReportsHero from './ReportsHero';
import { styled } from '../stitches.config';

export type Page = 'dashboard' | 'reports';

const AppWrapper = styled('div', {
  backgroundColor: '$bgMain', 
  minHeight: '100vh',
  width: '100%',
  color: '$textPrimary',
});

const MainContent = styled('main', {
  padding: '24px',
  maxWidth: '1400px',
  margin: '0 auto',
});

export default function Layout() {
  const [page, setPage] = useState<Page>('dashboard');

  return (
    <AppWrapper>
      <Header setPage={setPage} page={page} />

      <MainContent>
        {page === 'dashboard' && <Dashboard />}

        {page === 'reports' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <ReportsHero />
          </div>
        )}
      </MainContent>
    </AppWrapper>
  );
}