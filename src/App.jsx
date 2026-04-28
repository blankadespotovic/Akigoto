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
import Profil from './pages/profil/Profil'
import PromjenaKategorije from './pages/kategorije/PromjenaKategorija'
import NovaKategorija from './pages/kategorije/NovaKategorija'
import PregledKategorija from './pages/kategorije/PregledKategorija'
import GeneriranjePodatka from './pages/GeneriranjePodataka'
import PregledUcenika from './pages/ucenici/PregledUcenika'
import NoviUcenici from './pages/ucenici/NoviUcenici'
import PromjenaUcenika from './pages/ucenici/PromjenaUcenika'
import PregledLekcija from './pages/lekcije/PregledLekcija'
import NoveLekcije from './pages/lekcije/NoveLekcije'
import PromjenaLekcija from './pages/lekcije/PromjenaLekcije'
import LoadingSpinner from './components/LoadingSpinner'

function App() {


  return (
    <>
    <LoadingSpinner />
    <Container className='d-flex flex-column min-vh-100'>
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

           <Route path={RouteNames.GENERIRANJE_PODATAKA} element={<GeneriranjePodatka />} />

           <Route path={RouteNames.UCENICI} element={<PregledUcenika />} />
           <Route path={RouteNames.UCENICI_NOVI} element={<NoviUcenici />} />
           <Route path={RouteNames.PROMJENA_UCENIKA} element={<PromjenaUcenika />} />

           <Route path={RouteNames.LEKCIJE} element={<PregledLekcija />} />
           <Route path={RouteNames.LEKCIJE_NOVE} element={<NoveLekcije />} />
           <Route path={RouteNames.PROMJENA_LEKCIJA} element={<PromjenaLekcija />} />
      </Routes>
       <Footer />
    </Container>
     </>
  )
}

export default App
