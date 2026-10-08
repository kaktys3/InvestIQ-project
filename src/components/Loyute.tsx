import { loginUser, registerUser } from '../Store/dataScript'
import { useAppDispatch, useAppSelector } from '../Store'
import { market, monthlyAnalitic, profile, selectAllTransaction, selectState, statisticCategory } from '../Store/finansSelector'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import { useState } from 'react';
import Header from './Header';
import Dashboard from '../pages/DashboardPage/DashboardPage';
import ReportsHero from './ReportsHero';
import { styled } from '../stitches.config';
import { Outlet } from 'react-router-dom';

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
    <>
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
      <Outlet/>
    </>
  );
}


// export default function Loyute() {
//     const dispatch = useAppDispatch()
//     const profil = useAppSelector(profile)

//     console.log(profil)

//     const testFunction = (): void => {
//         dispatch(registerUser({ gmail: 'anang@gmai.com', password: '123456789', name: 'churka'}))
//     }
//     return (
//         <>
//         <button onClick={testFunction}>clik me</button>
//         </>
//     )
// }
