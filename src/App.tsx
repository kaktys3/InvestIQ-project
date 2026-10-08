import { Route, Routes } from 'react-router-dom'
import './App.css'
import Loyute from './components/Loyute'
import MainPage from './pages/MainPage/MainPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReportsPage from './pages/ReportsPage/ReportsPage'
import { useAppDispatch } from './Store'
import { marketRate } from './Store/dataScript'
// import Header from "./components/Header";
// import DashboardPage from "./pages/DashboardPage";

export type Page = "dashboard" | "reports";

function App() {
  const dispatch = useAppDispatch()
  dispatch(marketRate())

  // const [page, setPage] = useState<Page>("dashboard");

  return (
    <>
    {/* <div className="app">
      <Header page={page} setPage={setPage} />

      {page === "dashboard" && <DashboardPage />}
      {page === "reports" && <ReportsPage />}
      </div> */}
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
