import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Izbornik from './components/Izbornik'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import Profil from './pages/profil/profil'
import PregledPostignuca from './pages/postignuca/PregledPostignuca'
import NovaPostignuca from './pages/postignuca/NovaPostignuca'
import PromjenaPostignuca from './pages/postignuca/PromjenaPostignuca'
import { Footer } from './components/Footer'

function App() {

  return (
    <Container className='d-flex flex-column min-vh-100 w-75'>
      <Izbornik />

      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.PROFIL} element={<Profil />} />
        <Route path={RouteNames.POSTIGNUCA} element={<PregledPostignuca />} />
        <Route path={RouteNames.POSTIGNUCA_NOVA} element={<NovaPostignuca />} />
        <Route path={RouteNames.PROMJENA_POSTIGNUCA} element={<PromjenaPostignuca />} />
      </Routes>
       <Footer />
    </Container>
     
  )
}

export default App
