import { Route, Routes } from 'react-router-dom'
import './App.css'
import Loyute from './components/Loyute'
import MainPage from './pages/MainPage/MainPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReportsPage from './pages/ReportsPage/ReportsPage'
import { useAppDispatch } from './Store'
import { marketRate } from './Store/dataScript'

function App() {
  const dispatch = useAppDispatch()
  dispatch(marketRate())

  return (
    <>
      <Routes>
        <Route path='/' element={<Loyute />}>
          <Route path='/' element={<RegisterPage />}></Route>
          <Route path='/mainPage' element={<MainPage />}></Route>
          <Route path='/ReportsPage' element={<ReportsPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
