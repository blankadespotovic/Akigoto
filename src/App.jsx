import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Izbornik from './components/Izbornik'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import PregledPostignuca from './pages/postignuca/PregledPostignuca'
import NovaPostignuca from './pages/postignuca/NovaPostignuca'
import PromjenaPostignuca from './pages/postignuca/PromjenaPostignuca'
import { Footer } from './components/Footer'
import PostignucaService from './services/postignuca/PostignucaService'
import Profil from './pages/profil/Profil'
import PromjenaKategorije from './pages/kategorije/PromjenaKategorija'
import NovaKategorija from './pages/kategorije/NovaKategorija'
import PregledKategorija from './pages/kategorije/PregledKategorija'

function App() {

  
    useEffect(() => {
        PostignucaService.postaviKategorije();
    }, []);

  return (
    <Container className='d-flex flex-column min-vh-100 w-75'>
      <Izbornik />

      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.PROFIL} element={<Profil />} />
        <Route path={RouteNames.POSTIGNUCA} element={<PregledPostignuca />} />
        <Route path={RouteNames.POSTIGNUCA_NOVA} element={<NovaPostignuca />} />
        <Route path={RouteNames.PROMJENA_POSTIGNUCA} element={<PromjenaPostignuca />} />
        
        <Route path={RouteNames.KATEGORIJE} element={<PregledKategorija />} />
         <Route path={RouteNames.KATEGORIJE_NOVA} element={<NovaKategorija />} />
          <Route path={RouteNames.PROMJENA_KATEGORIJE} element={<PromjenaKategorije />} />
      </Routes>
       <Footer />
    </Container>
     
  )
}

export default App
