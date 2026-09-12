import { Route, Routes } from 'react-router-dom'
import './App.css'
import Loyute from './components/Loyute'
import MainPage from './pages/MainPage/MainPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReportsPage from './pages/ReportsPage/ReportsPage'

function App() {

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
